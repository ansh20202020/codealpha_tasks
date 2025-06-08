document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ageForm');
    const resultDiv = document.getElementById('result');
    
    // Set max year to current year
    const currentYear = new Date().getFullYear();
    document.getElementById('year').max = currentYear;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateAge();
    });
    
    function calculateAge() {
        const day = parseInt(document.getElementById('day').value);
        const month = parseInt(document.getElementById('month').value);
        const year = parseInt(document.getElementById('year').value);
        
        // Validate inputs
        if (!day || !month || !year) {
            showError('Please fill in all fields.');
            return;
        }
        
        // Validate date
        if (!isValidDate(day, month, year)) {
            showError('Please enter a valid date.');
            return;
        }
        
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        
        // Check if birth date is in the future
        if (birthDate > today) {
            showError('Birth date cannot be in the future.');
            return;
        }
        
        // Calculate age
        const ageData = getDetailedAge(birthDate, today);
        displayResult(ageData, birthDate);
    }
    
    function isValidDate(day, month, year) {
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && 
               date.getMonth() === month - 1 && 
               date.getDate() === day;
    }
    
    function getDetailedAge(birthDate, currentDate) {
        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();
        
        // Adjust for negative days
        if (days < 0) {
            months--;
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // Calculate total days, weeks, months
        const totalDays = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;
        
        return {
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            totalMonths,
            totalHours,
            totalMinutes
        };
    }
    
    function displayResult(ageData, birthDate) {
        const nextBirthday = getNextBirthday(birthDate);
        const daysUntilBirthday = Math.ceil((nextBirthday - new Date()) / (1000 * 60 * 60 * 24));
        
        const resultHTML = `
            <div class="age-display">
                ${ageData.years} Years, ${ageData.months} Months, ${ageData.days} Days
            </div>
            <p>🎉 You have been alive for an amazing journey!</p>
            
            <div class="age-details">
                <div class="detail-item">
                    <span class="detail-number">${ageData.totalMonths.toLocaleString()}</span>
                    <span class="detail-label">Total Months</span>
                </div>
                <div class="detail-item">
                    <span class="detail-number">${ageData.totalWeeks.toLocaleString()}</span>
                    <span class="detail-label">Total Weeks</span>
                </div>
                <div class="detail-item">
                    <span class="detail-number">${ageData.totalDays.toLocaleString()}</span>
                    <span class="detail-label">Total Days</span>
                </div>
                <div class="detail-item">
                    <span class="detail-number">${ageData.totalHours.toLocaleString()}</span>
                    <span class="detail-label">Total Hours</span>
                </div>
                <div class="detail-item">
                    <span class="detail-number">${ageData.totalMinutes.toLocaleString()}</span>
                    <span class="detail-label">Total Minutes</span>
                </div>
                <div class="detail-item">
                    <span class="detail-number">${daysUntilBirthday}</span>
                    <span class="detail-label">Days to Birthday</span>
                </div>
            </div>
        `;
        
        resultDiv.innerHTML = resultHTML;
        resultDiv.classList.add('show');
    }
    
    function getNextBirthday(birthDate) {
        const today = new Date();
        const nextBirthday = new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );
        
        // If birthday has passed this year, set it to next year
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        return nextBirthday;
    }
    
    function showError(message) {
        resultDiv.innerHTML = `<div class="error">${message}</div>`;
        resultDiv.classList.add('show');
    }
    
    // Add input validation and formatting
    document.getElementById('day').addEventListener('input', function() {
        if (this.value > 31) this.value = 31;
        if (this.value < 1 && this.value !== '') this.value = 1;
    });
    
    document.getElementById('year').addEventListener('input', function() {
        if (this.value > currentYear) this.value = currentYear;
        if (this.value < 1900 && this.value !== '') this.value = 1900;
    });
});
