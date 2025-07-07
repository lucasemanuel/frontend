 import { defineStore } from "pinia";

interface FiltersTravelState {
  destination: string;
  status: string;
  startDate: string;
  endDate: string;
  dispatch: string;
}

export const useFiltersTravelStore = defineStore("filtersTravelRequest", {
  state: (): FiltersTravelState => ({
    destination: "",
    status: "",
    startDate: "",
    endDate: "",
    dispatch: "",
  }),
  actions: {
    setFilters(filter: any) {
      this.destination = filter.destination || "";
      this.status = filter.status || "";
      this.startDate = filter.startDate || "";
      this.endDate = filter.endDate || "";
    },
    setDispatched(value: any) {
      this.dispatch = value;
    }
  },
  getters: {
    filters: (state) => {
      return state;
    },
    dispatched: (state) => {
      return state.dispatch;
    }
  },
});
