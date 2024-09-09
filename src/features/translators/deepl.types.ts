export interface DeepLUsage {
  character_count: number
  character_limit: number
}

export interface DeepLTranslate {
  detected_source_language: string
  text: string
}

export interface DeepLTranslateRes {
  translations: DeepLTranslate[]
}
