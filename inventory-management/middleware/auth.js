exports.checkAdminPassword = (req, res, next) => {
  // For GET requests, show a password form
  if (req.method === 'GET') {
    return res.render('admin/verify', { action: req.originalUrl });
  }
  
  // For POST/PUT/DELETE, verify the password
  if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
    return next();
  }
  
  res.status(403).send('Incorrect admin password');
};