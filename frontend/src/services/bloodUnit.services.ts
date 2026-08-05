import api from "@/lib/axios";

/* ─── Types ─── */

export type BloodUnitStatus =
  | "AVAILABLE"
  | "RESERVED"
  | "TRANSFERRED"
  | "USED"
  | "EXPIRED"
  | "REJECTED";

export interface BloodUnit {
  id: string;
  hospitalId: string;
  bloodGroup: string;
  componentType: string;
  collectionDate: string;
  expirationDate: string;
  volume: number;
  storageLocation: string;
  currentStatus: BloodUnitStatus;
  donor?: {
    name: string;
  } | null;
}

export interface InventoryGroup {
  bloodGroup: string;
  _count: {
    id: number;
  };
}

interface ApiResponse<T> {
  status?: string;
  message?: string;
  data: T;
}

/* ─── Blood Unit APIs ─── */

/** GET /blood-units/hospital — all blood units of the authenticated hospital. */
export const getHospitalBloodUnits = async () => {
  const response = await api.get<
    ApiResponse<{ bloodUnit: BloodUnit[] }> & { totalBloodUnits?: number }
  >("/blood-units/hospital");

  return response.data;
};

/** GET /blood-units/inventory — available units grouped by blood group. */
export const getHospitalInventory = async () => {
  const response = await api.get<
    ApiResponse<{ inventoryData: InventoryGroup[] }>
  >("/blood-units/inventory");

  return response.data;
};

/** GET /blood-units/inventory/:id — one blood unit's full details. */
export const getBloodUnitById = async (bloodUnitId: string) => {
  const response = await api.get<
    ApiResponse<{ bloodUnitData: BloodUnit }>
  >(`/blood-units/inventory/${bloodUnitId}`);

  return response.data;
};

/** PATCH /blood-units/:id/status — update a blood unit's lifecycle status. */
export const updateBloodUnitStatus = async (
  bloodUnitId: string,
  newStatus: BloodUnitStatus,
) => {
  const response = await api.patch<ApiResponse<BloodUnit>>(
    `/blood-units/${bloodUnitId}/status`,
    { newStatus },
  );

  return response.data;
};
