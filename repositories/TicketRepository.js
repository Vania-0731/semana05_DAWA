const BaseRepository = require("./BaseRespository");

class TicketRepository extends BaseRepository {
  constructor() {
    super("tickets");
  }
}

module.exports = TicketRepository;