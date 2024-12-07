import { rules } from "../services/rules";

export const findRecommendation = (formData) => {
  const priceInput = formData.budget ? parseInt(formData.budget, 10) : null; // Giá nhập vào
  const range = 300000; // Khoảng giá +/- 300.000 VNĐ

  const filteredRules = rules.filter((rule) => {
    const { condition, recommendation } = rule;

    // Chuyển đổi giá sản phẩm từ chuỗi sang số
    const productPrice = parseInt(recommendation.price.replace(/\D/g, ""), 10);

    // Lọc loại sản phẩm
    if (formData.type && condition.type !== formData.type) {
      return false;
    }

    // Lọc mục đích sử dụng
    if (formData.purpose && condition.purpose !== formData.purpose) {
      return false;
    }

    // Lọc theo khoảng giá
    if (priceInput) {
      if (
        productPrice < 0 ||
        productPrice > priceInput + range
      ) {
        return false;
      }
    }

    // Lọc theo tính năng
    if (formData.features && formData.features.length > 0) {
      if (
        !condition.features ||
        !formData.features.every((feature) =>
          condition.features.includes(feature)
        )
      ) {
        return false;
      }
    }

    // Lọc theo form
    if (formData.form && condition.form !== formData.form) {
      return false;
    }

    return true;
  });

  const recommendations = filteredRules.map((rule) => {
    const { condition } = rule;
    let score = 0;

    // Tính điểm dựa trên tiêu chí khớp
    if (formData.purpose && condition.purpose === formData.purpose) score++;
    if (
      formData.features &&
      formData.features.every((feature) =>
        condition.features?.includes(feature)
      )
    ) {
      score++;
    }
    if (formData.form && condition.form === formData.form) score++;

    return { ...rule.recommendation, score };
  });

  return recommendations.sort((a, b) => b.score - a.score); // Sắp xếp giảm dần theo điểm
};