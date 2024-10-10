export const handlerApiError = (error: unknown) => {
  if (error instanceof Error) {
    // Log the error or send it to a tracking service
    console.error('An error occurred:', error.message)
  } else {
    console.error('An unknown error occurred:', error)
  }

  // Optionally, return a user-friendly error message
  return 'Something went wrong. Please try again later.'
}
