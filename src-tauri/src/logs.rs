use std::collections::HashMap;

use log::logger;
use log::RecordBuilder;

#[tauri::command]
pub fn log(
    level: tauri_plugin_log::LogLevel,
    message: String,
    location: Option<&str>,
    file: Option<&str>,
    line: Option<u32>,
    key_values: Option<HashMap<String, String>>,
) {
    let location = location.unwrap_or("webview");

    let level = log::Level::from(level);

    let metadata = log::MetadataBuilder::new()
        .level(level)
        .target(tauri_plugin_log::WEBVIEW_TARGET)
        .build();

    let mut builder = RecordBuilder::new();
    builder
        .level(level)
        .metadata(metadata)
        .target(location)
        .file(file)
        .line(line);

    let key_values = key_values.unwrap_or_default();
    let mut kv = HashMap::new();
    for (k, v) in key_values.iter() {
        kv.insert(k.as_str(), v.as_str());
    }
    builder.key_values(&kv);

    logger().log(&builder.args(format_args!("{message}")).build());
}
