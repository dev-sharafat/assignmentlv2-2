import { Request } from "express";
export declare const vehicleService: {
    saveNewVehicleIntoDb: (req: Request) => Promise<any>;
    getAllVehiclesFromDb: () => Promise<any[]>;
    getSingleVehicleFromDb: (vehicleId: string) => Promise<any>;
    updateVehicleInDb: (vehicleId: string, updateData: any) => Promise<any>;
    deleteVehicleFromDb: (vehicleId: string) => Promise<any>;
};
//# sourceMappingURL=vehicle.service.d.ts.map