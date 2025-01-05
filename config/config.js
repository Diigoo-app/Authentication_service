let mailConfig = {};
if (process.env.NODE_ENV === "production") {
    mailConfig = {
    };
} else {
    mailConfig = {


    };
}

module.exports = {
    mail_config: mailConfig,
};
