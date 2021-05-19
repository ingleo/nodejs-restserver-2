const isAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "El usuario no tiene token verificado",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `El usuario ${name} no es administrador`,
    });
  }
  next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "El usuario no tiene token verificado",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El usuario debe tener uno de estos roles ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
