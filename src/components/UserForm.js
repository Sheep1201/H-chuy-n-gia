import React, { useState, useEffect } from "react";
import "./UserForm.css";
import { findRecommendation } from "../logic/recommendationLogic";

const UserForm = () => {
  const [type, setType] = useState("mouse"); // Mặc định chọn "chuột"
  const [purpose, setPurpose] = useState("");
  const [budget, setBudget] = useState("");
  const [features, setFeatures] = useState([]);
  const [layout, setLayout] = useState("");
  const [form, setForm] = useState("");
  const [switchType, setSwitchType] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const featureOptions = {
    mouse: ["DPI cao", "không dây"],
    keyboard: ["RGB"],
    headset: ["âm thanh vòm", "chống ồn", "micro chất lượng cao"],
  };
  const layoutOptions = {
    keyboard: ["60%", "75%", "95%", "100%"],
  };
  const formOptions = {
    mouse: ["Ergonomic", "Symmetrical"],
    headset: ["in-ear", "over-ear"],
  };
  const switchOptions = {
    keyboard: ["Linear", "Clicky", "Tactile"],
  };
  const purposeOptions = {
    mouse: ["gaming", "office", "design"],
    keyboard: ["gaming", "office", "programming"],
    headset: ["gaming", "music", "office"],
  };

  // Cập nhật danh sách sản phẩm khi tiêu chí thay đổi
  useEffect(() => {
    const filteredRecommendations = findRecommendation({
      type, // Bắt buộc loại sản phẩm
      purpose,
      budget: budget || Infinity,
      features: features.length > 0 ? features : [],
      form: form || undefined,
    });
    setRecommendations(filteredRecommendations);
  }, [type, purpose, budget, features, form]);

  const handleFeatureChange = (feature) => {
    setFeatures((prevFeatures) =>
      prevFeatures.includes(feature)
        ? prevFeatures.filter((f) => f !== feature)
        : [...prevFeatures, feature]
    );
  };

  // Tạo hàm lấy URL sản phẩm
  const getProductLink = (product) => {
    if (product === "Logitech G102") {
      return "https://pcpower.vercel.app/product-detail/67543b23e846484e45e4cbb2";
    }
    if (product === "Razer Basilisk X") {
      return "https://pcpower.vercel.app/product-detail/67543c1ee846484e45e4cbc6";
    }
    if (product === "Logitech G502 X Plus") {
      return "https://pcpower.vercel.app/product-detail/675445d95f8b03765b1337bd";
    }
    if (product === "Logitech M170") {
      return "https://pcpower.vercel.app/product-detail/675446235f8b03765b1337c4";
    }
    if (product === "Logitech M170") {
      return "https://pcpower.vercel.app/product-detail/675446235f8b03765b1337c4";
    }
    if (product === "Logitech M590") {
      return "https://pcpower.vercel.app/product-detail/675446525f8b03765b1337c9";
    }
    if (product === "Logitech MX Master 3S") {
      return "https://pcpower.vercel.app/product-detail/675446925f8b03765b1337d0";
    }
    if (product === "Redragon K617") {
      return "https://pcpower.vercel.app/product-detail/6754471b5f8b03765b133831";
    }
    if (product === "Keychron K2") {
      return "https://pcpower.vercel.app/product-detail/6754475b5f8b03765b13383a";
    }
    if (product === "Corsair K95 RGB Platinum") {
      return "https://pcpower.vercel.app/product-detail/675447995f8b03765b133845";
    }
    if (product === "Kotion Each GS410") {
      return "https://pcpower.vercel.app/product-detail/675447fb5f8b03765b133850";
    }
    if (product === "HyperX Cloud Stinger") {
      return "https://pcpower.vercel.app/product-detail/6754483c5f8b03765b133857";
    }
    if (product === "SteelSeries Arctis Pro") {
      return "https://pcpower.vercel.app/product-detail/675448795f8b03765b13385e";
    }
    // Nếu sản phẩm không phải Logitech G102, trả về link mặc định
    return "https://pcpower.vercel.app/type/";
  };

  // Reset các thuộc tính khi thay đổi loại sản phẩm
  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPurpose(""); // Reset mục đích khi thay đổi loại sản phẩm
    setBudget("");  // Reset ngân sách
    setFeatures([]); // Reset các tính năng
    setLayout("");  // Reset layout (nếu có)
    setForm("");    // Reset form (nếu có)
    setSwitchType(""); // Reset switch type (nếu có)
  };

  return (
    <>
      <form className="user-form">
        <h3>Loại sản phẩm:</h3>
        <select value={type} onChange={handleTypeChange}>
          <option value="mouse">Chuột</option>
          <option value="keyboard">Bàn phím</option>
          <option value="headset">Tai nghe</option>
        </select>

        <h3>Mục đích sử dụng:</h3>
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
          <option value="">Chọn mục đích</option>
          {purposeOptions[type]?.map((p, index) => (
            <option key={index} value={p}>{p}</option>
          ))}
        </select>

        <h3>Ngân sách (VNĐ):</h3>
        <input
          type="number"
          value={budget}
          placeholder="Nhập ngân sách của bạn"
          onChange={(e) => setBudget(e.target.value)}
        />

        <h3>Tính năng đặc biệt:</h3>
        {featureOptions[type]?.map((feature, index) => (
          <div className="check-box-div" key={index}>
            <div style={{ width: '70%' }}>
              <span>{feature}</span>
            </div>
            <div style={{ width: '30%' }}>
              <input
                className="check-box"
                type="checkbox"
                value={feature}
                checked={features.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
              />
            </div>
          </div>
        ))}
        {type === "keyboard" && (
          <>
            <h3>Layout phím:</h3>
            <select value={layout} onChange={(e) => setLayout(e.target.value)}>
              <option value="">Chọn layout</option>
              {layoutOptions.keyboard.map((layout, index) => (
                <option key={index} value={layout}>{layout}</option>
              ))}
            </select>
          </>
        )}
        {type === "keyboard" && (
          <>
            <h3>Switch Type:</h3>
            <select value={switchType} onChange={(e) => setSwitchType(e.target.value)}>
              <option value="">Chọn switch type</option>
              {switchOptions[type]?.map((switchOption, index) => (
                <option key={index} value={switchOption}>{switchOption}</option>
              ))}
            </select>
          </>
        )}
        {type === "mouse" && (
          <>
            <h3>Form chuột:</h3>
            <select value={form} onChange={(e) => setForm(e.target.value)}>
              <option value="">Chọn form chuột</option>
              {formOptions.mouse.map((formOption, index) => (
                <option key={index} value={formOption}>{formOption}</option>
              ))}
            </select>
          </>
        )}
      </form>

      {/* Hiển thị kết quả */}
      <div className="recommendations">
        <h2>Kết quả gợi ý:</h2>
        {recommendations.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đặc điểm</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Link sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec, index) => (
                <tr key={index}>
                  <td>{rec.product}</td>
                  <td>{rec.features.join(", ")}</td>
                  <td>{rec.suggestion}</td>
                  <td>{rec.price}</td>
                  <td>
                    <a
                      href={getProductLink(rec.product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'underline',
                        color: 'blue',
                        cursor: 'pointer',
                      }}
                    >
                      Click here
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có sản phẩm phù hợp với tiêu chí hiện tại.</p>
        )}
      </div>
    </>
  );
};

export default UserForm;
