const sliderEl = document.getElementById("Sensitivity_range");
const sliderValue = document.querySelector(".value");
window.thresholdValue = 0.1
// تابع برای نگاشت مقدار اسلایدر به threshold
function mapRangeToThreshold(value) {
    // اینجا چون محدوده min و max در HTML از 0.1 تا 1 است، نیازی به نگاشت اضافی نیست.
    return parseFloat(value);
}

// تنظیم مقدار threshold هنگام تغییر رینج
sliderEl.addEventListener("input", (event) => {
    const tempSliderValue = event.target.value;
    sliderValue.textContent = tempSliderValue;

    // محاسبه مقدار threshold
    window.thresholdValue = mapRangeToThreshold(tempSliderValue);

    // بهبود بصری استایل پس‌زمینه اسلایدر
    const progress = ((thresholdValue - 0.1) / 0.9) * 100;
    sliderEl.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;

    console.log("Threshold Value:", thresholdValue);
});
