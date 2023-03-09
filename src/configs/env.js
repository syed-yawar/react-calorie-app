/**
 * This file allows accessing environment variables from
 * a central place in the codebase.
 *
 * It also helps in setting up default values for env-
 * variables in case they are omitted from the actual
 * env files. */

export const ENV = {
  RESTFUL_BASE_URL: process.env.REACT_APP_RESTFUL_BASE_URL || "",
};
