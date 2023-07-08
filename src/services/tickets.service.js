import TicketManager  from "../dao/managers/TicketManagerMongo.js";

const ticketManager = new TicketManager()

export default class TicketService {
    purchaseCart = async (cid) => {
        return ticketManager.purchaseCart(cid);
    }
}