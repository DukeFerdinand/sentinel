// users/<email>
const userPath = (id) => `users/${id}`;

// users/<email>/projectsCount
exports.projectsCountPath = (id) => `${userPath(id)}/counts`;
