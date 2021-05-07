export default interface FiltersMenuProps {
  sortBySetting: string,
  setSortBySetting: (value: React.SetStateAction<string>) => void,
  priceFilter: number[],
  setPriceFilter: (value: React.SetStateAction<number[]>) => void,
  durationFilter: number[],
  setDurationFilter: (value: React.SetStateAction<number[]>) => void,
  departureHourFilter: Date,
  setDepartureHourFilter: (value: React.SetStateAction<Date>) => void,
  returnHourFilter: Date,
  setReturnHourFilter: (value: React.SetStateAction<Date>) => void,
  passengersCount: number,
  setPassengersCount: (value: React.SetStateAction<number>) => void,
  isSmallScreen: boolean
}