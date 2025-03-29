import { parseISO, format } from 'date-fns'

export const formatIsoDateTime = (isoDateTime: string) => {
  const date = parseISO(isoDateTime)
  return format(date, 'dd/MM/yyyy HH:mm')
}
