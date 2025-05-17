document.addEventListener('DOMContentLoaded', function() {
    // --- DATA: Documents ---
    // IMPORTANT:
    // - Replace placeholder data with your actual document details.
    // - Ensure 'filename' points to the correct path within your 'docs/' folder.
    // - Use 'null' for 'year' if not applicable.
    const documentData = [
        // Goa SOR Examples
        { id: 1, title: 'Goa PWD SOR - Civil Works 2023', year: 2023, category: 'Civil', documentType: 'SOR', filename: 'docs/building_gsr_2023.docx', keywords: 'goa schedule rates building', description: 'Comprehensive schedule for civil engineering projects, PWD Goa.' },
        { id: 2, title: 'Goa PWD SOR - Electrical Works 2023', year: 2023, category: 'Electrical', documentType: 'SOR', filename: 'docs/electrical_gsr_2023.docx', keywords: 'pwd schedule rates wiring panel lighting fixture goa schedule rates electrical', description: 'Detailed rates for electrical installations and maintenance.' },

      /*  // Goa Building Rules Examples
        { id: 3, title: 'Goa Land Development & Building Construction Regulations 2010', year: 2010, category: 'Rules & Regulations', documentType: 'Building Rules', filename: 'docs/goa_building_rules_2010.pdf', keywords: 'tcp goa building bylaws development control regulations', description: 'Official building rules and regulations for Goa.' },

        // CPWD Documents Examples
        { id: 4, title: 'CPWD Specifications 2019 - Vol 1 (Civil)', year: 2019, category: 'Specifications', documentType: 'CPWD Docs', filename: 'docs/cpwd_specs_2019_vol1.pdf', keywords: 'cpwd central public works department specifications civil construction', description: 'CPWD general specifications for civil works, Volume 1.' },
        { id: 5, title: 'CPWD Manual on Formwork', year: 2014, category: 'Manuals & Guidelines', documentType: 'CPWD Docs', filename: 'docs/cpwd_manual_formwork.pdf', keywords: 'cpwd formwork shuttering manual guidelines', description: 'CPWD guidelines and manual for formwork design and execution.' },

        // Construction Specifications Examples
        { id: 6, title: 'IS 456:2000 - Plain and Reinforced Concrete Code of Practice', year: 2000, category: 'Specifications', documentType: 'IS Codes', filename: 'docs/is_456_2000.pdf', keywords: 'is code indian standard concrete rcc design specifications', description: 'Bureau of Indian Standards code for plain and reinforced concrete.' },

        // Other official PDFs Examples
        { id: 7, title: 'Coastal Regulation Zone (CRZ) Notification 2019', year: 2019, category: 'Rules & Regulations', documentType: 'Notifications', filename: 'docs/crz_notification_2019.pdf', keywords: 'crz coastal regulation zone environment moefcc', description: 'Ministry of Environment, Forest and Climate Change CRZ Notification.' },
        { id: 8, title: 'Test PDF Document', year: null, category: 'General', documentType: 'Test Document', filename: 'docs/test.pdf', keywords: 'sample example', description: 'A sample document for testing purposes.' },
        { id: 9, title: 'Building GSR 2019 (PDF)', year: 2019, category: 'Civil', documentType: 'SOR', filename: 'docs/gsr_building_2019.pdf', keywords: 'gsr building rates', description: 'Goa Schedule of Rates for Building Works 2019.' },
        { id: 10, title: 'Electrical GSR 2023 (DOCX)', year: 2023, category: 'Electrical', documentType: 'SOR', filename: 'docs/Electrical GSR - 2023.docx', keywords: 'electrical rates schedule', description: 'Electrical Schedule of Rates for 2023.' },
*/
    ];

    const documentTableEl = document.getElementById('documentTable');
    const searchInputEl = document.getElementById('searchInput');
    const docTypeFilterEl = document.getElementById('docTypeFilter');
    const yearFilterEl = document.getElementById('yearFilter');
    const categoryFilterEl = document.getElementById('categoryFilter');
    const noResultsMessageEl = document.querySelector('.no-results');
    const currentYearSpanEl = document.getElementById('currentYear');

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.getElementById('primary-navigation');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isNavActive = primaryNav.classList.toggle('nav-active');
            navToggle.setAttribute('aria-expanded', isNavActive);
        });
    }

    // --- Footer Year & Initializations for Homepage ---
    if (currentYearSpanEl) {
        currentYearSpanEl.textContent = new Date().getFullYear();
    }

    function populateFilter(filterElement, dataKey, allText) {
        if (!filterElement) return;

        const uniqueValues = [...new Set(
            documentData
                .map(item => item[dataKey])
                .filter(value => value != null && value !== '') // Filter out null, undefined, or empty strings
        )].sort((a, b) => {
            // Sort years numerically in descending order, others alphabetically
            if (dataKey === 'year') return b - a;
            return String(a).localeCompare(String(b));
        });

        const defaultOptionText = filterElement.options[0] ? filterElement.options[0].textContent : `All ${allText}`;
        filterElement.innerHTML = `<option value="">${defaultOptionText}</option>`; // Reset with default

        uniqueValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            filterElement.appendChild(option);
        });
    }

    function displayDocuments(itemsToDisplay) {
        if (!documentTableEl) return;

        documentTableEl.innerHTML = ''; // Clear existing items
        if (noResultsMessageEl) noResultsMessageEl.style.display = 'none';

        if (itemsToDisplay.length === 0) {
            if (noResultsMessageEl) {
                noResultsMessageEl.style.display = 'block';
                // Trigger reflow for animation restart
                noResultsMessageEl.style.animation = 'none';
                noResultsMessageEl.offsetHeight; /* trigger reflow */
                noResultsMessageEl.style.animation = null;
            }
            return;
        }

        itemsToDisplay.forEach((item) => {
            const docItemDiv = document.createElement('div');
            // Use a consistent class name for styling the items, e.g., 'document-item'
            // This class is already defined in the CSS.
            docItemDiv.classList.add('document-item');

            docItemDiv.innerHTML = `
                <div class="document-item-info">
                    <h3>${item.title}</h3>
                    <p class="document-item-meta">
                        ${item.year ? `<span><i class="fas fa-calendar-alt"></i><strong>Year:</strong> ${item.year}</span>` : ''}
                        <span><i class="fas fa-folder-open"></i><strong>Type:</strong> ${item.documentType}</span>
                        <span><i class="fas fa="tags"></i><strong>Category:</strong> ${item.category}</span>
                    </p>
                    ${item.description ? `<p class="document-item-description">${item.description}</p>` : ''}
                </div>
                <a href="${item.filename}" class="download-button" download>
                    <i class="fas fa-download"></i> Download
                </a>
            `;
            documentTableEl.appendChild(docItemDiv);
            // Trigger reflow for animation restart on each item
            docItemDiv.style.animation = 'none';
            docItemDiv.offsetHeight; /* trigger reflow */
            docItemDiv.style.animation = null;
        });
    }

    function filterAndSearchDocuments() {
        if (!documentTableEl) return; // Only run if on homepage

        const searchTerm = searchInputEl.value.toLowerCase().trim();
        const selectedDocType = docTypeFilterEl.value;
        const selectedYear = yearFilterEl.value;
        const selectedCategory = categoryFilterEl.value;

        const filteredDocs = documentData.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const keywordMatch = item.keywords && item.keywords.toLowerCase().includes(searchTerm);
            const descriptionMatch = item.description && item.description.toLowerCase().includes(searchTerm);
            const yearSearchMatch = item.year && item.year.toString().includes(searchTerm);
            const docTypeSearchMatch = item.documentType.toLowerCase().includes(searchTerm);
            const categorySearchMatch = item.category.toLowerCase().includes(searchTerm);


            const matchesSearch = searchTerm === '' || titleMatch || keywordMatch || descriptionMatch || yearSearchMatch || docTypeSearchMatch || categorySearchMatch;
            const matchesDocType = selectedDocType === '' || item.documentType === selectedDocType;
            const matchesYear = selectedYear === '' || (item.year && item.year.toString() === selectedYear);
            const matchesCategory = selectedCategory === '' || item.category === selectedCategory;

            return matchesSearch && matchesDocType && matchesYear && matchesCategory;
        });

        displayDocuments(filteredDocs);
    }

    // --- Event Listeners & Initial Load for Homepage Functionality ---
    if (document.getElementById('documentTable')) { // Check if we are on a page with the document table
        if (searchInputEl) searchInputEl.addEventListener('input', filterAndSearchDocuments);
        if (docTypeFilterEl) docTypeFilterEl.addEventListener('change', filterAndSearchDocuments);
        if (yearFilterEl) yearFilterEl.addEventListener('change', filterAndSearchDocuments);
        if (categoryFilterEl) categoryFilterEl.addEventListener('change', filterAndSearchDocuments);

        populateFilter(docTypeFilterEl, 'documentType', 'Types');
        populateFilter(yearFilterEl, 'year', 'Years');
        // Category filter is static in HTML, but could be dynamic: populateFilter(categoryFilterEl, 'category', 'Categories');

        displayDocuments(documentData); // Display all documents initially
    }
});
