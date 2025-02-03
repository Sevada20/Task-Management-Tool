// function to format date to the format "DD.MM.YYYY" [S.P]
export const formatDate = (dateString: string) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options as any);
};
