export const checkPassword = (password: string): { isValid: boolean, errors: string[] } => {
    const errors: string[] = [];
    if (password.length < 8 || password.length > 60) {
        errors.push("The password must contain between 8 and 60 characters");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("The password must contain at least one capital letter");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("The password must contain at least one lowercase letter");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("The password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)");
    }
    return {
        isValid: errors.length === 0,
        errors,
    };
}
export const checkEmail = (email: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (email.length < 3 || email.length > 254) {
        errors.push("Email must contain between 3 and 254 characters");
    }


    if (!email.includes('@')) {
        errors.push("The email must contain the @ symbol");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push("Email has an incorrect format (for example, user@domain.com)");
    }

    if (/\s/.test(email)) {
        errors.push("Email should not contain spaces");
    }

    const usernameRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
    const username = email.split('@')[0];
    if (username && !usernameRegex.test(username)) {
        errors.push("The email username contains invalid characters");
    }

    const domain = email.split('@')[1];
    if (domain && !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
        errors.push("The email domain is in an incorrect format (for example, domain.com)");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};