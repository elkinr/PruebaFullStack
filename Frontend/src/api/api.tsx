import axios from 'axios';
import configUrl from '../const/configUrl.tsx';
import type { VehiculeRoute } from '../interfaces/vehiculeRoute';

export const GetInformationRoute = async (vehiculeRoute: VehiculeRoute, )=>{
    const {data} = await axios.post(`${configUrl.base}calculate-route/`,
        vehiculeRoute,
    );

    return data;
}