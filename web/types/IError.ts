export interface Error {
  message: string;
  locations: Location[];
  path: string[];
  extensions: Extensions;
}

export interface Location {
  line: number;
  column: number;
}

export interface Extensions {
  code: string;
  exception: Exception;
}

export interface Exception {
  validationErrors: ValidationError[];
  stacktrace: string[];
}

export interface ValidationError {
  target: Target;
  value: string;
  property: string;
  children: any[];
  constraints: Constraints;
}

export interface Target {
  email: string;
  username: string;
  password: string;
}

export interface Constraints {
  isLength: string;
}
