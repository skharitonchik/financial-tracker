import { FC, ReactNode, useState, useEffect } from 'react'
import { TextField } from '@mui/material';

type ConverterProps = {
  children?: ReactNode;
  amount: number,
  firstCurrency: string,
  secondCurrency: string
};

export const Converter: FC<ConverterProps> = ({amount, firstCurrency, secondCurrency}) => {
  const [exchangeRate, setExchangeRate] = useState(1)
  useEffect(() => {setExchangeRate(changeExchangeRate())})

  const changeExchangeRate = () => {
    switch(firstCurrency) {
      case 'BYN':
        switch(secondCurrency) {
          case 'BYN':
            return 1
          case 'USD':
            return 0.33
          case 'EUR':
            return 0.29
        }
      case 'USD':
        switch(secondCurrency) {
          case 'BYN':
            return 3.05
          case 'USD':
            return 1
          case 'EUR':
            return 0.89
        }
      case 'EUR':
        switch(secondCurrency) {
          case 'BYN':
            return 3.39
          case 'USD':
            return 1.11
          case 'EUR':
            return 1
        }

      default: return 1
    }
  }

  const isError = () => {
    if(!amount) {
      return true;
    } else {
      return false;
    }
  }

  const isHelper = () => {
    if(isError()) {
      return 'Check your amount'
    }
  }

  const convert = () => {
    if(amount) {
      return amount * exchangeRate;
    } else {
      return ' '
    }
  }

  return (
    <>
      <TextField
        sx={{mr: 1}}
        label='Exchange rate'
        value={exchangeRate}>
      </TextField>
      <TextField
        label={secondCurrency}
        error={isError()}
        helperText={isHelper()}
        value={convert()}
        defaultValue={' '}>
      </TextField>
    </>
  )
}