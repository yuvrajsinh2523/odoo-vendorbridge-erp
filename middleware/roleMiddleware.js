const roleAccess =
(allowedRoles) => {

    return (
    req,
    res,
    next
    ) => {

        if (
            !req.session.user
        ) {
            return res.redirect(
                "/login"
            );
        }

        const userRole =
        req.session.user.role;

        if (
            allowedRoles.includes(
                userRole
            )
        ) {
            return next();
        }

        return res.send(
        "Access Denied"
        );
    };
};

module.exports =
roleAccess;
