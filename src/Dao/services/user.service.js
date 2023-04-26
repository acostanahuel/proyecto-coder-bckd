import userModel from "../../models/user.model.js";
import CartService from "./cart.service.js";


    export default class UserService {

        save = async (user) =>{
        
        let result = await userModel.create(user);
        
        return result;
        
        };
        
};
