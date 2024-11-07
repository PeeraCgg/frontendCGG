

// ฟังก์ชันสำหรับบันทึก email ลงใน Local Storage
export const saveEmailToLocalStorage = (email) => {
    localStorage.setItem('userEmail', email);
};

// ฟังก์ชันสำหรับดึง email จาก Local Storage
export const getEmailFromLocalStorage = () => {
    return localStorage.getItem('userEmail');
};

// ฟังก์ชันสำหรับลบ email จาก Local Storage (ใช้เมื่อผู้ใช้ทำการ Logout)
export const removeEmailFromLocalStorage = () => {
    localStorage.removeItem('userEmail');
};
