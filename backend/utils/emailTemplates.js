//Email verification request template
const emailVerificationTemplate = (name, verificationUrl) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Email Address</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    background-color: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 5px 5px;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666;
                }
                .warning {
                    color: #f44336;
                    font-size: 12px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Verify Your Email Address</h1>
            </div>mongom
            <div class="content">
                <p>Hello ${name},</p>
                <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
                <div style="text-align: center;">
                    <a href="${verificationUrl}" class="button">Verify Email Address</a>
                </div>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p><a href="${verificationUrl}">${verificationUrl}</a></p>
                <p class="warning">This link will expire in 24 hours.</p>
                <p>If you didn't create an account with us, you can safely ignore this email.</p>
                <p>Best regards,<br>Your App Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </body>
        </html>
    `;
};

// Email verification success confirmation template
const emailVerifiedSuccessTemplate = (name) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verified Successfully</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    background-color: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 5px 5px;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Email Verified Successfully!</h1>
            </div>
            <div class="content">
                <p>Hello ${name},</p>
                <p>Your email address has been successfully verified.</p>
                <p>You can now log in to your account and start using all our features.</p>
                <div style="text-align: center;">
                    <a href="${process.env.FRONTEND_URL}/login" class="button">Login Now</a>
                </div>
                <p>Best regards,<br>Your App Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </body>
        </html>
    `;
};

// Password reset request template (reused from previous implementation)
const passwordResetEmail = (name, resetUrl) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    background-color: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 5px 5px;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666;
                }
                .warning {
                    color: #f44336;
                    font-size: 12px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Password Reset Request</h1>
            </div>
            <div class="content">
                <p>Hello ${name},</p>
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                <div style="text-align: center;">
                    <a href="${resetUrl}" class="button">Reset Password</a>
                </div>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p><a href="${resetUrl}">${resetUrl}</a></p>
                <p class="warning">This link will expire in 1 hour for security reasons.</p>
                <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
                <p>Best regards,<br>Your App Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </body>
        </html>
    `;
};

// Password reset success confirmation template
const passwordResetSuccessEmail = (name) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Changed Successfully</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    background-color: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 5px 5px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Password Changed Successfully</h1>
            </div>
            <div class="content">
                <p>Hello ${name},</p>
                <p>Your password has been successfully changed.</p>
                <p>If you did not make this change, please contact our support team immediately.</p>
                <p>Best regards,<br>Your App Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </body>
        </html>
    `;
};

// Welcome email for new users (reused from previous implementation)
const welcomeEmail = (name) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Our Platform</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    background-color: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 5px 5px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Welcome to Our Platform!</h1>
            </div>
            <div class="content">
                <p>Hello ${name},</p>
                <p>Thank you for joining our platform! We're excited to have you on board.</p>
                <p>You can now explore all the features we offer and start your journey with us.</p>
                <p>If you have any questions, feel free to reach out to our support team.</p>
                <p>Best regards,<br>Your App Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </body>
        </html>
    `;
};

const orderConfirmationEmail = (name, order) => {
    const itemsHtml = order.items.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #333;">
                ${item.name}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center; color: #333;">
                ${item.quantity}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #333;">
                Ksh${item.price.toFixed(2)}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #333;">
                Ksh${(item.price * item.quantity).toFixed(2)}
            </td>
        </tr>
    `).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
            <style>
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f5f5f5;
                }
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                }
                .content {
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 0 0 10px 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .order-details {
                    background-color: #f8f9fa;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 8px;
                    border: 1px solid #e9ecef;
                }
                .order-details h3 {
                    color: #495057;
                    margin-top: 0;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #dee2e6;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 15px 0;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                th {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 12px;
                    text-align: left;
                    font-weight: 600;
                    font-size: 14px;
                }
                th:first-child {
                    text-align: left;
                }
                th:nth-child(2) {
                    text-align: center;
                }
                th:nth-child(3),
                th:nth-child(4) {
                    text-align: right;
                }
                td {
                    padding: 12px;
                    border-bottom: 1px solid #f0f0f0;
                }
                .total {
                    text-align: right;
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 2px solid #e9ecef;
                }
                .total p {
                    font-size: 18px;
                    margin: 5px 0;
                }
                .total strong {
                    color: #667eea;
                    font-size: 20px;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    font-size: 12px;
                    color: #6c757d;
                    border-top: 1px solid #e9ecef;
                }
                .status {
                    display: inline-block;
                    padding: 5px 12px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                }
                .info-row {
                    margin: 10px 0;
                }
                .info-label {
                    font-weight: 600;
                    color: #495057;
                    min-width: 100px;
                    display: inline-block;
                }
                .info-value {
                    color: #6c757d;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🎉 Order Confirmation</h1>
            </div>
            <div class="content">
                <p>Hello <strong>${name}</strong>,</p>
                <p>Thank you for your order! Your order has been received and is being processed.</p>
                
                <div class="order-details">
                    <h3>📋 Order Details</h3>
                    <div class="info-row">
                        <span class="info-label">Order Number:</span>
                        <span class="info-value">${order._id}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Order Date:</span>
                        <span class="info-value">${new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Order Status:</span>
                        <span class="status">${order.status.toUpperCase()}</span>
                    </div>
                    
                    <h3>🛍️ Items Ordered</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                    
                    <div class="total">
                        <p><strong>Total Amount: Ksh${order.totalAmount.toFixed(2)}</strong></p>
                    </div>
                </div>
                
                <div class="order-details">
                    <h3>🚚 Shipping Information</h3>
                    <div class="info-row">
                        <span class="info-label">Phone Number:</span>
                        <span class="info-value">${order.contact}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Shipping Address:</span>
                        <span class="info-value">${order.shippingAddress}</span>
                    </div>
                </div>
                
                <p>We'll notify you once your order ships. If you have any questions, please contact our support team.</p>
                <p>Best regards,<br><strong>Shopease Team</strong><br><strong>0740390815</strong></p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
                <p>&copy; ${new Date().getFullYear()} S. All rights reserved.</p>
            </div>
        </body>
        </html>
    `;
};

const adminOrderNotificationEmail = (order, user) => {
    const itemsHtml = order.items.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #333;">
                ${item.name}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center; color: #333;">
                ${item.quantity}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #333;">
                Ksh${item.price.toFixed(2)}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #333;">
                Ksh${(item.price * item.quantity).toFixed(2)}
            </td>
        </tr>
    `).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Order Received</title>
            <style>
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f5f5f5;
                }
                .header {
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                }
                .alert-badge {
                    display: inline-block;
                    padding: 5px 15px;
                    background-color: #ff4757;
                    color: white;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    margin-top: 10px;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                .content {
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 0 0 10px 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .order-details {
                    background-color: #f8f9fa;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 8px;
                    border: 1px solid #e9ecef;
                }
                .order-details h3 {
                    color: #495057;
                    margin-top: 0;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #dee2e6;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 15px 0;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                th {
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    color: white;
                    padding: 12px;
                    text-align: left;
                    font-weight: 600;
                    font-size: 14px;
                }
                th:first-child {
                    text-align: left;
                }
                th:nth-child(2) {
                    text-align: center;
                }
                th:nth-child(3),
                th:nth-child(4) {
                    text-align: right;
                }
                td {
                    padding: 12px;
                    border-bottom: 1px solid #f0f0f0;
                }
                .total {
                    text-align: right;
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 2px solid #e9ecef;
                }
                .total p {
                    font-size: 16px;
                    margin: 5px 0;
                }
                .total strong {
                    color: #f5576c;
                    font-size: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 12px 30px;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 25px;
                    margin: 20px 0;
                    font-weight: 600;
                    transition: transform 0.3s ease;
                }
                .button:hover {
                    transform: translateY(-2px);
                }
                .info-row {
                    margin: 10px 0;
                }
                .info-label {
                    font-weight: 600;
                    color: #495057;
                    min-width: 120px;
                    display: inline-block;
                }
                .info-value {
                    color: #6c757d;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    font-size: 12px;
                    color: #6c757d;
                    border-top: 1px solid #e9ecef;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🔔 New Order Received</h1>
                <div class="alert-badge">⚠️ ACTION REQUIRED</div>
            </div>
            <div class="content">
                <p>Hello <strong>Admin</strong>,</p>
                <p>A new order has been placed and requires your immediate attention.</p>
                
                <div class="order-details">
                    <h3>📋 Order Details</h3>
                    <div class="info-row">
                        <span class="info-label">Order Number:</span>
                        <span class="info-value">${order._id}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Order Date:</span>
                        <span class="info-value">${new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Order Status:</span>
                        <span class="info-value" style="color: #f5576c; font-weight: 600;">${order.status.toUpperCase()}</span>
                    </div>
                    
                    <h3>👤 Customer Information</h3>
                    <div class="info-row">
                        <span class="info-label">Name:</span>
                        <span class="info-value">${user.name}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Email:</span>
                        <span class="info-value">${user.email}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Phone:</span>
                        <span class="info-value">${order.contact}</span>
                    </div>
                    
                    <h3>🛍️ Items Ordered</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                    
                    <div class="total">
                        <p><strong>Total Amount: Ksh${order.totalAmount.toFixed(2)}</strong></p>
                    </div>
                </div>
                
                <div class="order-details">
                    <h3>🚚 Shipping Information</h3>
                    <div class="info-row">
                        <span class="info-label">Address:</span>
                        <span class="info-value">${order.shippingAddress}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Contact Number:</span>
                        <span class="info-value">${order.contact}</span>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <a href="${process.env.FRONTEND_URL}/dashboard/orders" class="button">📊 View Order Details</a>
                </div>
                
                <p>Please process this order as soon as possible. The customer is waiting for confirmation.</p>
                <p>Best regards,<br><strong>Shopease System</strong></p>
            </div>
            <div class="footer">
                <p>This is an automated message from your e-commerce platform.</p>
                <p>&copy; ${new Date().getFullYear()} Shopease. All rights reserved.</p>
            </div>
        </body>
        </html>
    `;
};

module.exports = {
    emailVerificationTemplate,
    emailVerifiedSuccessTemplate,
    passwordResetEmail,
    passwordResetSuccessEmail,
    welcomeEmail,
    orderConfirmationEmail,
    adminOrderNotificationEmail
};