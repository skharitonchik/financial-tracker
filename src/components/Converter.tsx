import { FC, useState, useEffect } from 'react'
import { TextField, Typography } from '@mui/material';

type ConverterProps = {
  amount: number,
  firstCurrency: string,
  secondCurrency: string
};

export const Converter: FC<ConverterProps> = ({amount, firstCurrency, secondCurrency}) => {
  const [exchangeRate, setExchangeRate] = useState(1)
  const [result, setResult] = useState(0)
  useEffect(() => {setExchangeRate(changeExchangeRate())})
  useEffect(() => {setResult(convert())})

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

  const convert = () => {
    if(amount) {
      return +(amount * exchangeRate).toFixed(2);
    } else {
      return 0
    }
  }

  return (
    <>
      <TextField
        sx={{mr: 1}}
        label='Exchange rate'
        value={exchangeRate}>
      </TextField>
      <Typography>
        ~ {result} {secondCurrency}
      </Typography>
    </>
  )
}