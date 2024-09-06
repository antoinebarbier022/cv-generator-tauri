import { Avatar, Box, Card, List, ListDivider, Stack, Typography } from '@mui/joy'

import { convertFileSrc } from '@tauri-apps/api/tauri'
import { useMemo } from 'react'

import { useFormCV } from '@/hooks/useFormCV'
import { PageLayout } from '@/layouts/page-layout'
import { ResumeContentSection, Translation, UserDataExperience } from '@/types/storage'
import { isEmptyObject } from '../../utils/object.utils'

export const SummaryPage = () => {
  const { formValues } = useFormCV()

  const imageProfile = formValues.picture
  const projectCount = formValues.experiences.filter((e) => !e.isHidden).length ?? 0
  const getColumnsProjectCount = {
    lg: projectCount > 4 ? 2 : 1,
    xl: projectCount > 4 && projectCount > 10 ? 3 : ''
  }

  const filterVisibleItems = <T,>(
    sectionKey:
      | 'skills'
      | 'formation'
      | 'languages'
      | 'sectors'
      | 'employment_history'
      | 'experiences'
  ): ResumeContentSection<T>[] => {
    if (!formValues) {
      return []
    }
    return (
      (formValues[sectionKey] as ResumeContentSection<T>[]).filter(
        (e) => !(e.isHidden && isEmptyObject(e.content))
      ) ?? []
    )
  }

  const skills = useMemo(() => filterVisibleItems<Translation>('skills'), [formValues.skills])

  const formation = useMemo(
    () => filterVisibleItems<Translation>('formation'),
    [formValues.formation]
  )

  const languages = useMemo(
    () => filterVisibleItems<Translation>('languages'),
    [formValues.languages]
  )

  const sectors = useMemo(() => filterVisibleItems<Translation>('sectors'), [formValues.sectors])
  const employmentHistory = useMemo(
    () => filterVisibleItems<Translation>('employment_history'),
    [formValues.employment_history]
  )
  const experiences = useMemo(
    () => filterVisibleItems<UserDataExperience>('experiences'),
    [formValues.experiences]
  )

  const showFormation = formation.length >= 1
  const showSkills = skills.length >= 1
  const showSectors = sectors.length >= 1
  const showLanguages = languages.length >= 1
  const showExperiences = experiences.length >= 1
  const showEmploymentHistory = employmentHistory.length >= 1

  return (
    <PageLayout>
      <Stack direction={'row'} flexWrap={'wrap'} mt={1} gap={2}>
        <Card
          size="lg"
          sx={{
            padding: 4,
            justifyContent: 'center',
            minWidth: '480px',
            flex: 1
          }}
        >
          <Avatar
            src={
              imageProfile ? `${convertFileSrc(imageProfile)}?removeCache=${new Date()}` : undefined
            }
            sx={{
              width: '140px',
              height: '140px',
              borderWidth: 6,
              borderColor: imageProfile
                ? 'var(--joy-palette-text-primary)'
                : 'var(--joy-palette-neutral-400)',
              borderStyle: 'solid'
            }}
          />
          <Stack>
            <Typography
              fontFamily={'QuartoF'}
              textColor={'text.primary'}
              lineHeight={'4rem'}
              fontSize={'3rem'}
              fontWeight={500}
            >
              {formValues.firstname ?? 'nom'} {formValues.lastname}
            </Typography>
            <Typography fontFamily={'BentonSans'}>
              {formValues.role.fr}
              {formValues.role.fr && formValues.grade && ' - '}

              {formValues.grade && `Grade ${formValues.grade}`}
            </Typography>
          </Stack>
          <Typography fontFamily={'BentonSans'}>{formValues.description.fr}</Typography>
        </Card>

        {(showSectors || showSkills || showLanguages) && (
          <Stack gap={2} sx={{ minWidth: '280px', flex: 1 }}>
            {(showSectors || showSkills) && (
              <Card size="lg" sx={{ flex: 1 }}>
                <Typography
                  fontFamily={'BentonSans'}
                  level="title-md"
                  textTransform={'uppercase'}
                  sx={{ pb: 1, borderBottom: '1px solid' }}
                >
                  Expertises clés / secteurs
                </Typography>

                <List sx={{ p: 0, gap: 0.5 }}>
                  {skills.map((skill) => (
                    <Typography fontFamily={'BentonSans'} component={'li'}>
                      {skill.content.fr}
                    </Typography>
                  ))}
                  {showSectors && showSkills && <ListDivider sx={{ my: 1.5 }} />}

                  {sectors.map((sector) => (
                    <Typography fontFamily={'BentonSans'} component={'li'}>
                      {sector.content.fr}
                    </Typography>
                  ))}
                </List>
              </Card>
            )}

            {showLanguages && (
              <Card size="lg" sx={{ minWidth: '200px', flex: 1 }}>
                <Typography
                  fontFamily={'BentonSans'}
                  level="title-md"
                  textTransform={'uppercase'}
                  sx={{ pb: 1, borderBottom: '1px solid' }}
                >
                  Languages
                </Typography>
                <List sx={{ p: 0 }}>
                  {languages.map((language) => (
                    <Typography fontFamily={'BentonSans'} component={'li'}>
                      {language.content.fr}
                    </Typography>
                  ))}
                </List>
              </Card>
            )}
          </Stack>
        )}

        {(showFormation || showEmploymentHistory) && (
          <Stack direction={'row'} flexWrap={'wrap'} gap={2} sx={{ minWidth: '280px', flex: 1 }}>
            {showFormation && (
              <Card size="lg" sx={{ minWidth: '200px', minHeight: '140px', flex: 1 }}>
                <Typography
                  fontFamily={'BentonSans'}
                  level="title-md"
                  textTransform={'uppercase'}
                  sx={{ pb: 1, borderBottom: '1px solid' }}
                >
                  Formation
                </Typography>
                <List sx={{ p: 0 }}>
                  {formation.map((el) => (
                    <Typography fontFamily={'BentonSans'} component={'li'}>
                      {el.content.fr}
                    </Typography>
                  ))}
                </List>
              </Card>
            )}

            {showEmploymentHistory && (
              <Card size="lg" sx={{ minWidth: '200px', minHeight: '140px', flex: 2 }}>
                <Typography
                  fontFamily={'BentonSans'}
                  level="title-md"
                  textTransform={'uppercase'}
                  sx={{ pb: 1, borderBottom: '1px solid' }}
                >
                  Emplois antérieur à frog
                </Typography>
                {employmentHistory.map((employment) => (
                  <Typography fontFamily={'BentonSans'}>{employment.content.fr}</Typography>
                ))}
              </Card>
            )}
          </Stack>
        )}

        {showExperiences && (
          <Card size="lg" sx={{ width: '100%' }}>
            <Box
              maxWidth={{
                md: '100%',
                lg: getColumnsProjectCount.lg === 2 ? 'calc(50% - 2rem / 2)' : '100%',
                xl: getColumnsProjectCount.xl === 3 ? 'calc(100% / 3 - 2rem)' : ''
              }}
            >
              <Typography
                level="title-md"
                fontFamily={'BentonSans'}
                textTransform={'uppercase'}
                sx={{ pb: 1, mb: 2, borderBottom: '1px solid' }}
              >
                Expérience @ frog
              </Typography>
            </Box>
            <Box
              sx={{
                columns: {
                  md: 1,
                  lg: getColumnsProjectCount.lg,
                  xl: getColumnsProjectCount.xl
                },
                columnGap: '2rem'
              }}
            >
              {formValues.experiences
                .filter((e) => !e.isHidden)
                .map((project) => (
                  <Stack pb={4}>
                    <Typography fontFamily={'BentonSans'} level="title-md">
                      {[project.content.program, project.content.client, project.content.role.fr]
                        .filter((e) => e)
                        .join(' - ')}{' '}
                      {project.content.date && `(${project.content.date})`}
                    </Typography>
                    <Typography
                      fontFamily={'BentonSans'}
                      level="body-md"
                      fontStyle={'italic'}
                      whiteSpace={'pre-line'}
                      textColor={'text.tertiary'}
                    >
                      {project.content.context.fr}
                    </Typography>
                    <Typography fontFamily={'BentonSans'} whiteSpace={'pre-line'} level="body-md">
                      {project.content.contribution.fr}
                    </Typography>
                  </Stack>
                ))}
            </Box>
          </Card>
        )}
      </Stack>
    </PageLayout>
  )
}
