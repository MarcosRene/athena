import { render, screen } from '@testing-library/react'

import { App } from './App'

describe('<App />', () => {
  it('should render correctly', () => {
    render(<App />)

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
  })
})
