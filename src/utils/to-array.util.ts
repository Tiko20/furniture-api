export const toArray = (value?: string | string[], asNumber = false) =>
  value
    ? (Array.isArray(value) ? value : value.split(",")).map((v) =>
        asNumber ? Number(v) : v
      )
    : [];