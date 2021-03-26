const INITIAL_FILTER_STATE = {
  search: "",
  sortField: "createdAt",
  sortOrder: "ASC",
};

const sortOptions = [
  { label: "Name", value: "content" },
  { label: "Date", value: "createdAt" },
  { label: "Status", value: "done" },
];

export { INITIAL_FILTER_STATE, sortOptions };
