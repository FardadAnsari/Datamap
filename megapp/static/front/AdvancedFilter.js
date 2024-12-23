document.addEventListener("DOMContentLoaded", () => {
    function updateSliderBackground(slider, value, max) {
        const progress = (value / max) * 100;
        slider.style.background = `linear-gradient(to right, #007bff ${progress}%, #ccc ${progress}%)`;
    }

    function initializeSlider(slider, label, checkbox) {
        const initialValue = slider.value;
        label.textContent = initialValue;
        updateSliderBackground(slider, initialValue, slider.max);

        slider.disabled = !checkbox.checked;
        if (!checkbox.checked) {
            slider.style.background = "#ccc";
        }

        checkbox.addEventListener("change", () => {
            slider.disabled = !checkbox.checked;
            if (checkbox.checked) {
                updateSliderBackground(slider, slider.value, slider.max);
            } else {
                slider.style.background = "#ccc";
            }
        });

        slider.addEventListener("input", (event) => {
            const value = event.target.value;
            label.textContent = value;
            updateSliderBackground(slider, value, slider.max);
        });
    }

    // Rating slider setup
    const ratingSlider = document.getElementById("Rating_range");
    const ratingLabel = document.querySelector(".value_Rating_range");
    const ratingCheckbox = document.getElementById("Rating_checkbox");
    initializeSlider(ratingSlider, ratingLabel, ratingCheckbox);

    // Review slider setup
    const reviewSlider = document.getElementById("Review_range");
    const reviewLabel = document.querySelector(".value_Review_range");
    const reviewCheckbox = document.getElementById("Review_checkbox");
    initializeSlider(reviewSlider, reviewLabel, reviewCheckbox);
});
