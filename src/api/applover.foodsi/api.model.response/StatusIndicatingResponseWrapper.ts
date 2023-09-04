type StatusIndicatingResponseWrapper<T> = {
  status?: "success" | "error" | "SUCCESS" | number;
  success?: boolean | string;
  data?: T;
  error?: string;
  errors?:
    | string
    | Array<string>
    | {
        [name: string]: Array<string>;
      };
};

export default StatusIndicatingResponseWrapper;
