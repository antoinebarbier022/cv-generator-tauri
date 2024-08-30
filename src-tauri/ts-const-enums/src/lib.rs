use convert_case::{Case, Casing};
use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote, ToTokens};
use syn::{DeriveInput, Fields};

#[derive(deluxe::ExtractAttributes, Debug, Clone)]
#[deluxe(attributes(ts))]
struct TsAttributes {
    export_to: String,
    rename: Option<String>
}

#[proc_macro_derive(TsConstEnum, attributes(ts))]
pub fn ts_const_enum_derive(input: proc_macro::TokenStream) -> proc_macro::TokenStream {
    ts_const_enum_derive_macro2(input.into()).unwrap().into()
}

struct Entry {
    name: Ident,
    value: String,
}

fn ts_const_enum_derive_macro2(input: proc_macro2::TokenStream) -> deluxe::Result<TokenStream> {
    let mut ast: DeriveInput = syn::parse2(input)?;
    let ident = &ast.ident.clone();

    let TsAttributes { export_to: file_name, rename: type_name, .. } = deluxe::extract_attributes(&mut ast)?;
    let type_name = type_name.unwrap_or(ident.clone().to_string());

    if let syn::Data::Enum(enum_data) = &mut ast.data {
        let mut entries: Vec<Entry> = vec![];

        for variant in enum_data.clone().variants {
            if let Fields::Unit = variant.fields {} else {
                return Ok(quote! {
                    compile_error!("All enum variant must be unit-like, {} isn't", variant.ident)
                })
            }
            entries.push(Entry {
                name: variant.ident.clone(),
                value: variant.ident.to_string().to_case(Case::Kebab)
            })
        }

        let decl_body = format_decl_body(entries);
        let export = generate_export(&ident,&type_name);

        let ts_impl = quote! {
            impl ts_rs::TS for #ident {
                type WithoutGenerics = Self;
                fn ident() -> String { #type_name.to_owned() }
                fn decl() -> String {
                    let inline = <Self as TS>::inline();
                    let generics = "";
                    format!("enum {}{generics} {inline}", #type_name, generics = generics, inline = inline)
                }
                fn decl_concrete() -> String {
                    format!("enum {} = {}", #type_name, <Self as TS>::inline())
                }
                fn name() -> String { #type_name.to_owned() }
                fn inline() -> String {
                    #decl_body.to_string()
                }
                fn inline_flattened() -> String {
                    Self::inline()
                }
                fn output_path() -> Option<&'static std::path::Path> { Some(std::path::Path::new(#file_name)) }
            }
        };

        Ok(quote! {
            #ts_impl

            #export
        })
    } else {
        Ok(quote! {
            compile_error!("Only enums are supported")
        })
    }
}

fn generate_export(ident: &Ident, type_name: &str) -> TokenStream {
    let export_fun_ident = format_ident!("export_bindings_{}", type_name.to_lowercase());

    quote! {
        #[cfg(test)]
        #[test]
        fn #export_fun_ident() {
            <#ident as ts_rs::TS>::export_all().expect("could not export type");
        }
    }
}

fn format_decl_body(entries: Vec<Entry>) -> TokenStream {
    format!("{{\n{}\n}}", format_entries(entries)).to_token_stream()
}

fn format_entries(entries: Vec<Entry>) -> String {
    entries.iter().map(|entry| entry_to_line(entry)).collect::<Vec<String>>().join("\n")
}

fn entry_to_line(entry: &Entry) -> String {
    format!(r#"  {} = "{}","#, entry.name, entry.value)
}


