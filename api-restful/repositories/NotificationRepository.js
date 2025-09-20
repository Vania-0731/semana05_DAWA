const BaseRepository = require("./BaseRespository");

class NotificationRepository extends BaseRepository {
  constructor() {
    super("notifications");
  }
}

module.exports = NotificationRepository;