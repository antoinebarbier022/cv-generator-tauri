import { useMutation } from '@tanstack/react-query'
import { invoke } from '@tauri-apps/api/tauri'
import { toast } from 'react-toastify'
import { ToastGenerationSuccess } from '../components/toast-generation-success'
import { CVGenerationService } from '../services/cv-generation.service'

export const useGenerate = () => {
  return useMutation({
    mutationKey: ['generate'],
    mutationFn: CVGenerationService.generate,
    onSuccess: async (data, outputFilePath) => {
      if (data) {
        const outputList = outputFilePath.split('/')
        const fileName = outputList[outputList.length - 1]

        const renderContent = (
          <ToastGenerationSuccess
            filename={fileName}
            onOpenFinder={(e) => {
              e.stopPropagation()
              invoke('open_finder', { path: outputFilePath })
              toast.dismiss('generation-succeeded')
            }}
            onClose={(e) => {
              e.stopPropagation()
              toast.dismiss('generation-succeeded')
            }}
          />
        )

        toast.info(renderContent, {
          type: 'info',
          toastId: `generation-succeeded`,
          icon: false,
          autoClose: 30000,
          hideProgressBar: false,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          progress: undefined,
          closeButton: false,
          theme: 'light',
          className: 'group',

          onClick(e) {
            e.stopPropagation()
            invoke('open_powerpoint', { path: outputFilePath })
          }
        })

        toast.update(`generation-succeeded`, {
          render: renderContent
        })
      }
    },
    onError: (e) => {
      alert(`Generate [error] : ${e}`)
    }
  })
}
