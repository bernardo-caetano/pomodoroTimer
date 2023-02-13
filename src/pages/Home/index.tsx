import { HandPalm, Play } from 'phosphor-react'

import { useForm, FormProvider } from 'react-hook-form'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'

import { Countdown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'
import { CyclesContext } from '../../context/CyclesContext'
import { useContext } from 'react'

// const newCycleFormValidationSchema = zod.object({
//   task: zod.string().minLength(1, 'Informe a tarefa'),
//   minutesAmount: zod
//     .number()
//     .minValue(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
//     .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
// })

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    // resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountDownButton
            onClick={() => interruptCurrentCycle()}
            type="button"
          >
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
