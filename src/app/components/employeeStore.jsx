import { create } from "zustand";

 
 const useEmployeeStore = create((set) => ({
  employees: [], // Initialize employees as an empty array
  updateEmployees: (newEmployees) => set({ employees: newEmployees }),
}));

export default useEmployeeStore;
