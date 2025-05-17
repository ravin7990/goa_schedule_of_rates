document.addEventListener('DOMContentLoaded', function() {
    // --- DATA: SOR Documents ---
    const sorData = [
        // Ensure filenames are correct and point to your 'documents' folder
        { id: 1, title: 'Goa PWD SOR - Civil Works 2021-22', year: 2021, category: 'Civil', filename: 'documents/test.pdf', keywords: 'building road bridge concrete', description: 'Comprehensive schedule for civil engineering projects, PWD Goa.' },
        { id: 7, title: 'Goa PWD SOR - Plumbing Works 2021', year: 2021, category: 'Plumbing', filename: 'documents/placeholder_plumbing_2021.pdf', keywords: 'water supply sanitation pipeline', description: 'Latest plumbing rates for 2021.' },
    ];

    const sorTable = document.getElementById('sorTable');
    const searchInput = document.getElementById('searchInput');
    const yearFilter = document.getElementById('yearFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const noResultsMessage = document.querySelector('.no-results');
    const currentYearSpan = document.getElementById('currentYear');

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    function populateYearFilter() {
        if (!yearFilter) return;
        const years = [...new Set(sorData.map(item => item.year))].sort((a, b) => b - a);
        // Preserve "All Years" option
        const existingOptions = Array.from(yearFilter.options).filter(opt => opt.value === "");
        yearFilter.innerHTML = ''; // Clear existing year options except "All Years"
        existingOptions.forEach(opt => yearFilter.appendChild(opt));

        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
    }

    function displaySORs(itemsToDisplay) {
        if (!sorTable) return;

        sorTable.innerHTML = ''; // Clear existing items
        if (noResultsMessage) noResultsMessage.style.display = 'none';


        if (itemsToDisplay.length === 0) {
            if (noResultsMessage) {
                noResultsMessage.style.display = 'block';
                // Trigger reflow for animation restart
                noResultsMessage.style.animation = 'none';
                noResultsMessage.offsetHeight; /* trigger reflow */
                noResultsMessage.style.animation = null;
            }
            return;
        }

        itemsToDisplay.forEach((item, index) => {
            const sorItemDiv = document.createElement('div');
            sorItemDiv.classList.add('sor-item');
            // sorItemDiv.style.animationDelay = `${index * 0.05}s`; // Optional: Staggered animation

            const displayTitle = item.title; // Full title is fine with card layout

            sorItemDiv.innerHTML = `
                <div class="sor-item-info">
                    <h3>${displayTitle}</h3>
                    <p class="sor-item-meta">
                        <span><i class="fas fa-calendar-alt"></i><strong>Year:</strong> ${item.year}</span>
                        <span><i class="fas fa-tags"></i><strong>Category:</strong> ${item.category}</span>
                    </p>
                    ${item.description ? `<p class="sor-item-description">${item.description}</p>` : ''}
                </div>
                <a href="${item.filename}" class="download-button" download>
                    <i class="fas fa-download"></i> Download PDF
                </a>
            `;
            sorTable.appendChild(sorItemDiv);

            // Trigger reflow for animation restart on each item
            sorItemDiv.style.animation = 'none';
            sorItemDiv.offsetHeight; /* trigger reflow */
            sorItemDiv.style.animation = null;
        });
    }

    function filterAndSearchSORs() {
        if (!sorTable) return;

        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedYear = yearFilter.value;
        const selectedCategory = categoryFilter.value;

        const filteredSORs = sorData.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const keywordMatch = item.keywords && item.keywords.toLowerCase().includes(searchTerm);
            const descriptionMatch = item.description && item.description.toLowerCase().includes(searchTerm);
            const yearSearchMatch = item.year.toString().includes(searchTerm);

            const matchesSearch = searchTerm === '' || titleMatch || keywordMatch || descriptionMatch || yearSearchMatch;
            const matchesYear = selectedYear === '' || item.year.toString() === selectedYear;
            const matchesCategory = selectedCategory === '' || item.category === selectedCategory;

            return matchesSearch && matchesYear && matchesCategory;
        });

        displaySORs(filteredSORs);
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterAndSearchSORs);
    }
    if (yearFilter) {
        yearFilter.addEventListener('change', filterAndSearchSORs);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndSearchSORs);
    }

    if (sorTable) {
        populateYearFilter();
        displaySORs(sorData);
    }
});
