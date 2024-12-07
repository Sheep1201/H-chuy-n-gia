import React, { useState } from "react";
import UserForm from "./components/UserForm";
import logo from "./asset/Logo.png";

const App = () => {
  const [recommendation, setRecommendation] = useState(null);

  const handleRecommendation = (data) => {
    setRecommendation(data); // Lưu gợi ý vào state
  };

  return (
    <>
      <header style={{
        height: '50px',
        padding: '5px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid lightgray',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}>
        <a href="https://pcpower.vercel.app/" target="_blank" rel="noopener noreferrer" style={{
          height: '100%', // Đặt chiều cao thẻ a bằng chiều cao của header
          display: 'flex', // Đảm bảo thẻ a có thể chứa nội dung ảnh
          alignItems: 'center', // Canh giữa ảnh theo chiều dọc
        }}>
          <img
            alt="logo-header"
            src={logo}
            className="logo-header"
            style={{
              maxHeight: '100%', // Đảm bảo ảnh không vượt quá chiều cao của header
              maxWidth: '100%', // Đảm bảo ảnh không vượt quá chiều rộng của thẻ a
              objectFit: 'contain', // Giữ tỷ lệ ảnh mà không bị méo
            }}
          />
        </a>
      </header>

      <div style={{ padding: "20px" }}>
        <h1>Tư vấn sản phẩm PCPOWER</h1>
        <UserForm onRecommendation={handleRecommendation} />

        {/* Hiển thị gợi ý sản phẩm nếu có */}

      </div>
    </>
  );
};

export default App;
