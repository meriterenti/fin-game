"use client";

// error page shuold be rendered clint side

const ErrorWrapper = ({ error }: { error: Error }) => <h1>{error.message}</h1>;

export default ErrorWrapper;
