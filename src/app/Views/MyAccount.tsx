import {
  Avatar,
  Box,
  Card,
  List,
  ListDivider,
  Stack,
  Typography,
} from "@mui/joy";

import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useFormCV } from "../../features/form/hooks/useFormCV";
import { PageLayout } from "../../layouts/page-layout";

export const MyAccount = () => {
  const { userData } = useFormCV();

  const imageProfile = userData.data?.picture;
  const projectCount =
    userData.data?.experiences.filter((e) => !e.isHidden).length ?? 0;
  const getColumnsProjectCount = {
    lg: projectCount > 4 ? 2 : 1,
    xl: projectCount > 4 && projectCount > 10 ? 3 : "",
  };
  return (
    <PageLayout>
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
      {userData.data && (
        <Stack direction={"row"} flexWrap={"wrap"} mt={1} gap={2}>
          <Card
            size="lg"
            sx={{
              padding: 4,
              justifyContent: "center",
              minWidth: "480px",
              flex: 1,
            }}
          >
            <Avatar
              src={
                imageProfile
                  ? `${convertFileSrc(imageProfile)}?removeCache=${new Date()}`
                  : undefined
              }
              sx={{
                width: "140px",
                height: "140px",
                borderWidth: 6,
                borderColor: imageProfile
                  ? "var(--joy-palette-text-primary)"
                  : "var(--joy-palette-neutral-400)",
                borderStyle: "solid",
              }}
            />
            <Stack>
              <Typography
                fontFamily={"QuartoF"}
                textColor={"text.primary"}
                lineHeight={"4rem"}
                fontSize={"3rem"}
                fontWeight={500}
              >
                {userData.data.firstname ?? "nom"} {userData.data.lastname}
              </Typography>
              <Typography fontFamily={"BentonSans"}>
                {userData.data.role.fr}
                {userData.data.role.fr && userData.data.grade && " - "}

                {userData.data.grade && `Grade ${userData.data.grade}`}
              </Typography>
            </Stack>
            <Typography fontFamily={"BentonSans"}>
              {userData.data.description.fr}
            </Typography>
          </Card>

          <Stack gap={2} sx={{ minWidth: "280px", flex: 1 }}>
            <Card size="lg" sx={{ flex: 1 }}>
              <Typography
                fontFamily={"BentonSans"}
                level="title-md"
                textTransform={"uppercase"}
                sx={{ pb: 1, borderBottom: "1px solid" }}
              >
                Expertises clés / secteurs
              </Typography>

              <List sx={{ p: 0, gap: 0.5 }}>
                {userData.data.skills
                  .filter((e) => !e.isHidden)
                  .map((skill) => (
                    <Typography fontFamily={"BentonSans"} component={"li"}>
                      {skill.content.fr}
                    </Typography>
                  ))}
                {userData.data.sectors.filter((e) => !e.isHidden).length >= 1 &&
                  userData.data.skills.filter((e) => !e.isHidden).length >=
                    1 && <ListDivider sx={{ my: 1.5 }} />}

                {userData.data.sectors
                  .filter((e) => !e.isHidden)
                  .map((sector) => (
                    <Typography fontFamily={"BentonSans"} component={"li"}>
                      {sector.content.fr}
                    </Typography>
                  ))}
              </List>
            </Card>

            <Card size="lg" sx={{ minWidth: "200px", flex: 1 }}>
              <Typography
                fontFamily={"BentonSans"}
                level="title-md"
                textTransform={"uppercase"}
                sx={{ pb: 1, borderBottom: "1px solid" }}
              >
                Languages
              </Typography>
              <List sx={{ p: 0 }}>
                {userData.data.languages
                  .filter((e) => !e.isHidden)
                  .map((language) => (
                    <Typography fontFamily={"BentonSans"} component={"li"}>
                      {language.content.fr}
                    </Typography>
                  ))}
              </List>
            </Card>
          </Stack>

          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            gap={2}
            sx={{ minWidth: "280px", flex: 1 }}
          >
            <Card
              size="lg"
              sx={{ minWidth: "200px", minHeight: "140px", flex: 1 }}
            >
              <Typography
                fontFamily={"BentonSans"}
                level="title-md"
                textTransform={"uppercase"}
                sx={{ pb: 1, borderBottom: "1px solid" }}
              >
                Formation
              </Typography>
              <List sx={{ p: 0 }}>
                {userData.data.formation
                  .filter((e) => !e.isHidden)
                  .map((el) => (
                    <Typography fontFamily={"BentonSans"} component={"li"}>
                      {el.content.fr}
                    </Typography>
                  ))}
              </List>
            </Card>

            <Card
              size="lg"
              sx={{ minWidth: "200px", minHeight: "140px", flex: 2 }}
            >
              <Typography
                fontFamily={"BentonSans"}
                level="title-md"
                textTransform={"uppercase"}
                sx={{ pb: 1, borderBottom: "1px solid" }}
              >
                Emplois antérieur à frog
              </Typography>
              {userData.data.employment_history
                .filter((e) => !e.isHidden)
                .map((employment) => (
                  <Typography fontFamily={"BentonSans"}>
                    {employment.content.fr}
                  </Typography>
                ))}
            </Card>
          </Stack>

          <Card size="lg" sx={{ width: "100%" }}>
            <Box
              maxWidth={{
                md: "100%",
                lg:
                  getColumnsProjectCount.lg === 2
                    ? "calc(50% - 2rem / 2)"
                    : "100%",
                xl:
                  getColumnsProjectCount.xl === 3
                    ? "calc(100% / 3 - 2rem)"
                    : "",
              }}
            >
              <Typography
                level="title-md"
                fontFamily={"BentonSans"}
                textTransform={"uppercase"}
                sx={{ pb: 1, mb: 2, borderBottom: "1px solid" }}
              >
                Expérience @ frog
              </Typography>
            </Box>
            <Box
              sx={{
                columns: {
                  md: 1,
                  lg: getColumnsProjectCount.lg,
                  xl: getColumnsProjectCount.xl,
                },
                columnGap: "2rem",
              }}
            >
              {userData.data.experiences
                .filter((e) => !e.isHidden)
                .map((project) => (
                  <Stack pb={4}>
                    <Typography fontFamily={"BentonSans"} level="title-md">
                      {[
                        project.content.program,
                        project.content.client,
                        project.content.role.fr,
                      ]
                        .filter((e) => e)
                        .join(" - ")}{" "}
                      {project.content.date && `(${project.content.date})`}
                    </Typography>
                    <Typography
                      fontFamily={"BentonSans"}
                      level="body-md"
                      fontStyle={"italic"}
                      whiteSpace={"pre-line"}
                      textColor={"text.tertiary"}
                    >
                      {project.content.context.fr}
                    </Typography>
                    <Typography
                      fontFamily={"BentonSans"}
                      whiteSpace={"pre-line"}
                      level="body-md"
                    >
                      {project.content.contribution.fr}
                    </Typography>
                  </Stack>
                ))}
            </Box>
          </Card>
        </Stack>
      )}
    </PageLayout>
  );
};
