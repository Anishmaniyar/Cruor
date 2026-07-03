import * as inventoryRepository from "./inventory.repository.js";

export const getHospitalInventoryService = async (hospitalId) => {
  const inventoryData =
    await inventoryRepository.getHospitalInventoryRepository(hospitalId);

  return inventoryData;
};
