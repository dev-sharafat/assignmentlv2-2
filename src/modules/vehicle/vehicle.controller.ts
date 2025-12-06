// import { Request, Response } from "express";
// import { sendResponse } from "../../helper/sendResponse";
// import { vehicleService } from "./vehicle.service";

// const saveNewVehicle = async (req: Request, res: Response) => {
//     const result = await vehicleService.saveNewVehicleIntoDb(req);
//     sendResponse(res, {
//         success: true,
//         status: 201,
//         message: 'Vehicle saved successfully',
//         data: result
//     });
// }
// const getAllVehicles = async (req: Request, res: Response) => {
//     const result = await vehicleService.getAllVehiclesFromDb();
//     sendResponse(res, {
//         success: true,
//         status: 200,
//         message: 'Vehicles retrieved successfully',
//         data: result
//     });
// }
// const getSingleVehicle = async (req: Request, res: Response) => {
//     const result = await vehicleService.getSingleVehicleFromDb(req?.params?.vehicleId as string);
//     sendResponse(res, {
//         success: true,
//         status: 200,
//         message: 'Vehicles retrieved successfully',
//         data: result
//     });
// }
// const updateVehicle = async (req: Request, res: Response) => {
//     const result = await vehicleService.updateVehicleInDb(req?.params?.vehicleId as string, req?.body);
//     sendResponse(res, {
//         success: true,
//         status: 200,
//         message: 'Vehicle updated successfully',
//         data: result
//     });
// }
// const deleteVehicle = async (req: Request, res: Response) => {
//     const result = await vehicleService.deleteVehicleFromDb(req?.params?.vehicleId as string);
//     sendResponse(res, {
//         success: true,
//         status: 200,
//         message: 'Vehicle deleted successfully',
//         data: result
//     });
// }

// export const vehicleController = {
//     saveNewVehicle,
//     getAllVehicles,
//     getSingleVehicle,
//     updateVehicle,
//     deleteVehicle
// };