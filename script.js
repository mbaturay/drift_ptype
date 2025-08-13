document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    var slider = document.getElementById('slider');
    var metadataContainer = document.getElementById('metadata');
    var rulesPanel = document.getElementById('rules-panel');
    var table = document.getElementById('documents-table');
    var searchInput = document.getElementById('search-input');
    var advancedSearchToggle = document.getElementById('advanced-search-toggle');
    var advancedSearchPanel = document.getElementById('advanced-search-panel');
    var applyFiltersButton = document.getElementById('apply-filters');
    var clearFiltersButton = document.getElementById('clear-filters');
    var hamburgerMenu = document.getElementById('hamburger-menu');
    var selectAllCheckbox = document.getElementById('select-all-checkbox');
    
    // Document metadata for the slider panel
    var documentMetadata = [
        {
            title: 'BPA-Wildfire-Mitigation-Plan.pdf',
            category: 'Wildfire Mitigation Plan',
            classification: 'BISAC - TEC010000 - Technology & Engineering / Power Resources / Electric',
            company: 'Bonneville Power Administration',
            company_initialism: 'BPA',
            country: 'United States',
            date: '2022-07-01',
            description: "BPA's Wildfire Mitigation Plan covers end-to-end activities related to the mitigation of wildfires across the Federal Columbia River Transmission System.",
            economic_value: '',
            industry: 'Electric',
            motivation: 'To protect public safety and preserve the reliable delivery of electricity during destructive events, such as wildfires.',
            objectives: [
                "Mitigate the probability that BPA's Transmission assets may be the source of ignition or a fuel source of a wildfire, while continuing to provide reliable transmission service to our customers.",
                'Implement a plan that prioritizes safety, situational awareness, preventative methods, and recovery.',
                'Maintain a plan that aligns with utility best practice competencies and risk mitigation activities'
            ],
            type: 'Initial filing',
            population: 'Customers and communities served by the Federal Columbia River Transmission System',
            risk_factors: ['Vegetation/Fuel', 'Asset failure', 'Contact from object(s)', 'Wire to wire contact', 'Other factors like work activities'],
            rules: 'NERC FAC 003-4',
            state: 'Idaho, Oregon, Washington',
            summary: "BPA's Wildfire Mitigation Plan covers its end-to-end activities related to the mitigation of wildfires across its transmission system. The plan includes an overview of BPA's preventive strategies and programs, risk analysis, asset overview, wildfire prevention strategies, emerging technologies, emergency response, restoration of service, and accountability measures.",
            version: 'Final',
            year: '2022'
        },
        {
            title: 'Project-X-Development-Plan.pdf',
            category: 'Technology Development Plan',
            classification: 'BISAC - TEC020000 - Technology & Engineering / Research & Development',
            company: 'Tech Innovators Inc.',
            company_initialism: 'TII',
            country: 'United States',
            date: '2025-03-15',
            description: "A comprehensive plan for the development of Project X, focusing on innovative technologies and market strategies.",
            economic_value: '$2.5M projected ROI',
            industry: 'Technology',
            motivation: 'To pioneer new technologies that address emerging market needs and provide competitive advantages.',
            objectives: [
                'Develop prototypes by Q3 2025',
                'Complete market validation by Q4 2025',
                'Launch initial product by Q1 2026'
            ],
            type: 'Planning',
            population: 'Early adopters and tech enthusiasts',
            risk_factors: ['Market competition', 'Technical feasibility', 'Regulatory compliance'],
            rules: 'Internal Development Framework',
            state: 'California, Nevada',
            summary: "Project X aims to revolutionize the tech industry by introducing innovative solutions to long-standing problems. The plan details the development process, resource allocation, and market approach.",
            version: 'Draft 2.0',
            year: '2025'
        },
        {
            title: 'Green-Energy-Report.pdf',
            category: 'Energy Sustainability',
            classification: 'BISAC - TEC031010 - Technology & Engineering / Power Resources / Alternative & Renewable',
            company: 'Green Future LLC',
            company_initialism: 'GF',
            country: 'United States',
            date: '2023-01-10',
            description: "Analysis of renewable energy adoption and sustainability initiatives across multiple regions.",
            economic_value: 'Environmental and social returns',
            industry: 'Energy',
            motivation: 'To promote sustainable energy practices and reduce carbon footprints.',
            objectives: [
                'Increase the adoption of renewable energy sources.',
                'Educate the public on energy conservation.',
                'Collaborate with governments and organizations to implement green policies.'
            ],
            type: 'Implementation',
            population: 'Environmentalists and energy sector professionals',
            risk_factors: ['Policy changes', 'Technological limitations', 'Public acceptance'],
            rules: 'EPA Guidelines',
            state: 'Texas, Arizona',
            summary: "The Green Energy Report highlights the progress and challenges in achieving energy sustainability.",
            version: 'Final',
            year: '2023'
        },
        {
            title: 'Renewable-Resources-Strategy.pdf',
            category: 'Renewable Energy Strategy',
            classification: 'BISAC - TEC031010 - Technology & Engineering / Power Resources / Alternative & Renewable',
            company: 'Eco Solutions Corp',
            company_initialism: 'ESC',
            country: 'United States',
            date: '2024-05-22',
            description: "Strategic planning document for transitioning to renewable resources across multiple sectors.",
            economic_value: '$1.8M annual savings projected',
            industry: 'Energy',
            motivation: 'To create a sustainable energy framework that reduces dependence on fossil fuels.',
            objectives: [
                'Identify optimal renewable energy sources for different geographic regions',
                'Develop implementation roadmap for organizations',
                'Create cost-benefit analysis templates for decision makers'
            ],
            type: 'Planning',
            population: 'Energy policy makers and corporate sustainability officers',
            risk_factors: ['Resource availability', 'Infrastructure limitations', 'Regulatory changes'],
            rules: 'International Renewable Energy Standards',
            state: 'Colorado, Utah',
            summary: "This strategy document provides a comprehensive framework for evaluating and implementing renewable resource solutions with actionable steps for various stakeholders.",
            version: '1.2',
            year: '2024'
        },
        {
            title: 'Smart-Grid-Analysis.pdf',
            category: 'Electric Infrastructure',
            classification: 'BISAC - TEC010000 - Technology & Engineering / Power Resources / Electric',
            company: 'Northeast Power Systems',
            company_initialism: 'NPS',
            country: 'United States',
            date: '2021-11-15',
            description: "Analysis of smart grid implementation across urban centers in the northeastern United States.",
            economic_value: '$3.2M infrastructure savings',
            industry: 'Electric',
            motivation: 'To modernize aging power infrastructure with intelligent systems.',
            objectives: [
                'Implement real-time monitoring across 85% of the grid',
                'Reduce power outages by 40%',
                'Enable dynamic load balancing during peak demand periods'
            ],
            type: 'Implementation',
            population: 'Urban residents and businesses in the Northeast',
            risk_factors: ['Cybersecurity threats', 'Legacy system integration', 'Weather events'],
            rules: 'NERC CIP Standards',
            state: 'New York, Massachusetts',
            summary: "This analysis details the progress of smart grid technology implementation across northeastern urban centers, highlighting successes, challenges, and lessons learned.",
            version: 'Final',
            year: '2021'
        }
    ];
    
    // Sorting state
    var currentSort = {
        column: null,
        direction: 'asc'
    };

    // Initialize table data for filtering and sorting
    var tableData = [];
    // Seed docState so only some docs are new for demo
    var docState = JSON.parse(localStorage.getItem('docState') || '{}');
    function saveDocState() { localStorage.setItem('docState', JSON.stringify(docState)); }
    // On first load, mark only some docs as new
    document.addEventListener('DOMContentLoaded', function() {
        var anySeeded = Object.keys(docState).length > 0;
        if (!anySeeded && window.tableData && window.tableData.length) {
            window.tableData.forEach(function(doc, i) {
                // Mark first 3 as new, rest as seen
                docState[doc.id] = { isNew: i < 3, collections: [] };
            });
            saveDocState();
        }
    });
    
    // Extract data from table
    function initializeTableData() {
        tableData = [];
        var rows = table.querySelectorAll('tbody tr');
        
    for(var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var cells = row.querySelectorAll('td');
            if (cells.length > 0) {
        var id = i; // stable in this demo
        var existing = docState[id] || { isNew: true, collections: [] };
        docState[id] = existing;
        tableData.push({
            id: id,
            isNew: existing.isNew,
            title: cells[1].textContent, 
            type: cells[2].textContent,
            state: cells[3].textContent,
            industry: cells[4].textContent,
            company: cells[5].textContent,
            year: cells[6].textContent
        });
            }
        }
    saveDocState();
    }

    // Toggle advanced search panel
    advancedSearchToggle.addEventListener('click', function() {
        advancedSearchPanel.classList.toggle('open');
    });
    
    // Add event listeners to all filter selects to close slider when changed
    var filterSelects = document.querySelectorAll('.filter-item select');
    for(var i = 0; i < filterSelects.length; i++) {
        filterSelects[i].addEventListener('change', function() {
            closeSlider();
        });
    };

    // Apply filters button click
    applyFiltersButton.addEventListener('click', function() {
        closeSlider();
        applyFiltersAndSearch();
    });

    // Clear all filters and search
    clearFiltersButton.addEventListener('click', function() {
        var selects = document.querySelectorAll('.filter-item select');
        for(var i = 0; i < selects.length; i++) {
            selects[i].value = '';
        }
        searchInput.value = '';
        closeSlider();
        applyFiltersAndSearch();
    });

    // Real-time search as you type
    searchInput.addEventListener('input', function() {
        closeSlider();
        applyFiltersAndSearch();
    });

    // Track last search to support restore after "View matches"
    var lastSearchState = { term: '', active: false };
    
    // Helper function to close the slider
    function closeSlider() {
        // Only close if it's open
        if (slider.classList.contains('open')) {
            slider.classList.remove('open');
            
            // Remove selected row highlight
            var selectedRows = table.querySelectorAll('tbody tr.selected');
            for(var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].classList.remove('selected');
            }
        }
    }

    // Make table headers sortable (except checkbox column)
    var headers = table.querySelectorAll('thead th[data-sort]');
    for(var i = 0; i < headers.length; i++) {
        headers[i].addEventListener('click', function() {
            var column = this.getAttribute('data-sort');
            sortTable(column);
        });
    }

    // Close slider button
    document.querySelector('.close-slider').addEventListener('click', function() {
        slider.classList.remove('open');
        if (rulesPanel) rulesPanel.style.display = 'none';
        
        // Remove selected row highlight
        var selectedRows = table.querySelectorAll('tbody tr.selected');
        for(var i = 0; i < selectedRows.length; i++) {
            selectedRows[i].classList.remove('selected');
        }
    });

    // Toggle hamburger menu
    hamburgerMenu.addEventListener('click', function() {
        var sideNavigation = document.getElementById('side-navigation');
        sideNavigation.classList.toggle('open');
    });

    // Sort the table by column
    function sortTable(column) {
        // Close the slider when sorting
        closeSlider();
        
        // Update sort direction
        if (currentSort.column === column) {
            currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            currentSort.column = column;
            currentSort.direction = 'asc';
        }

        // Update header classes
        var headers = table.querySelectorAll('thead th');
        for(var i = 0; i < headers.length; i++) {
            headers[i].classList.remove('sort-asc', 'sort-desc');
        }
        
        var header = table.querySelector('th[data-sort="' + column + '"]');
        header.classList.add(currentSort.direction === 'asc' ? 'sort-asc' : 'sort-desc');

        applyFiltersAndSearch();
    }

    // Apply all filters and search
    function applyFiltersAndSearch() {
        var searchTerm = searchInput.value.toLowerCase();
        var typeFilter = document.getElementById('filter-type').value;
        var stateFilter = document.getElementById('filter-state').value;
        var industryFilter = document.getElementById('filter-industry').value;
        var yearFilter = document.getElementById('filter-year').value;

        // Filter data
        var filteredData = [];
        for(var i = 0; i < tableData.length; i++) {
            var row = tableData[i];
            
            // Search term matching
            var matchesSearch = false;
            for(var key in row) {
                if(String(row[key]).toLowerCase().includes(searchTerm)) {
                    matchesSearch = true;
                    break;
                }
            }

            // Filter matching
            var matchesType = !typeFilter || row.type.includes(typeFilter);
            var matchesState = !stateFilter || row.state.includes(stateFilter);
            var matchesIndustry = !industryFilter || row.industry === industryFilter;
            var matchesYear = !yearFilter || row.year === yearFilter;

            if(matchesSearch && matchesType && matchesState && matchesIndustry && matchesYear) {
                filteredData.push(row);
            }
        }

        // Apply sorting if active
        if (currentSort.column) {
            filteredData.sort(function(a, b) {
                if (currentSort.column === 'isNew') {
                    var aNew = (docState[a.id] || {isNew:true}).isNew;
                    var bNew = (docState[b.id] || {isNew:true}).isNew;
                    if (aNew === bNew) return 0;
                    return (aNew ? -1 : 1) * (currentSort.direction === 'asc' ? 1 : -1);
                }
                var valueA = String(a[currentSort.column]).toLowerCase();
                var valueB = String(b[currentSort.column]).toLowerCase();
                if (valueA < valueB) return currentSort.direction === 'asc' ? -1 : 1;
                if (valueA > valueB) return currentSort.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        updateTableRows(filteredData);
        
        // Update select all checkbox state after filtering/sorting
        setTimeout(updateSelectAllCheckbox, 0);
    }

    // Update table rows with filtered and sorted data
    function updateTableRows(data) {
        var tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        if (data.length === 0) {
            var noResultsRow = document.createElement('tr');
            var noResultsCell = document.createElement('td');
            noResultsCell.colSpan = 8; // Updated for the new column structure (added New column)
            noResultsCell.textContent = 'No matching documents found';
            noResultsCell.style.textAlign = 'center';
            noResultsCell.style.padding = '20px';
            noResultsRow.appendChild(noResultsCell);
            tbody.appendChild(noResultsRow);
        } else {
            for(var i = 0; i < data.length; i++) {
                var rowData = data[i];
                var row = document.createElement('tr');
                row.dataset.docId = rowData.id;
                
                // Add checkbox cell first
                var checkboxCell = document.createElement('td');
                checkboxCell.className = 'checkbox-column';
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'row-checkbox';
                checkboxCell.appendChild(checkbox);
                row.appendChild(checkboxCell);
                
                // New column
                var newCell = document.createElement('td');
                var state = docState[rowData.id] || { isNew: true, collections: [] };
                if (state.isNew) {
                    var newBadge = document.createElement('span');
                    newBadge.className = 'badge badge-new';
                    newBadge.textContent = 'New';
                    newCell.appendChild(newBadge);
                }
                row.appendChild(newCell);
                // Add title column
                var titleCell = document.createElement('td');
                titleCell.className = 'cell-with-badges';
                // Badges container
                var badges = document.createElement('span');
                // Collections badges (show up to 2)
                if (state.collections && state.collections.length > 0) {
                    var max = Math.min(2, state.collections.length);
                    for (var c = 0; c < max; c++) {
                        var colBadge = document.createElement('span');
                        colBadge.className = 'badge badge-collection';
                        colBadge.textContent = state.collections[c];
                        badges.appendChild(colBadge);
                    }
                    if (state.collections.length > 2) {
                        var more = document.createElement('span');
                        more.className = 'collection-chip';
                        more.textContent = '+' + (state.collections.length - 2);
                        badges.appendChild(more);
                    }
                }
                var titleText = document.createElement('span');
                titleText.textContent = rowData.title;
                titleCell.appendChild(badges);
                titleCell.appendChild(titleText);
                row.appendChild(titleCell);
                // Create cells for each column, in the correct order for the UI
                var columns = ['type', 'state', 'industry', 'company', 'year'];
                for(var j = 0; j < columns.length; j++) {
                    var key = columns[j];
                    var cell = document.createElement('td');
                    cell.textContent = rowData[key];
                    row.appendChild(cell);
                }

                // Stop propagation on checkbox click to prevent row click event
                checkbox.addEventListener('click', function(event) {
                    event.stopPropagation();
                });

                // Add click handler for showing metadata (excluding checkbox clicks)
                row.addEventListener('click', function(rowData, event) {
                    // Ignore clicks on the checkbox cell
                    if (event.target.type === 'checkbox' || event.target.className === 'checkbox-column') {
                        return;
                    }
                    
                    var rows = tbody.querySelectorAll('tr');
                    for(var k = 0; k < rows.length; k++) {
                        rows[k].classList.remove('selected');
                    }
                    this.classList.add('selected');
                    
                    var metadata = documentMetadata[rowData.id];
                    displayMetadata(metadata);
                    slider.classList.add('open');
                    // Mark as seen (no longer new)
                    var st = docState[rowData.id] || { isNew: true, collections: [] };
                    if (st.isNew) {
                        st.isNew = false;
                        docState[rowData.id] = st;
                        saveDocState();
                        // Sync tableData row
                        for (var ti = 0; ti < tableData.length; ti++) {
                            if (tableData[ti].id === rowData.id) { tableData[ti].isNew = false; break; }
                        }
                        // Refresh badges for this row only
                        applyFiltersAndSearch();
                    }
                }.bind(row, rowData));
                
                tbody.appendChild(row);
            }
        }
    }

    // Display metadata in the slider
    function displayMetadata(metadata) {
        metadataContainer.innerHTML = '';
        
        for(var key in metadata) {
            var p = document.createElement('p');
            var strong = document.createElement('strong');
            strong.textContent = key + ': ';
            p.appendChild(strong);
            
            var value = metadata[key];
            if (Array.isArray(value)) {
                var ul = document.createElement('ul');
                for(var i = 0; i < value.length; i++) {
                    var li = document.createElement('li');
                    li.textContent = value[i];
                    ul.appendChild(li);
                }
                p.appendChild(ul);
            } else {
                p.appendChild(document.createTextNode(value));
            }
            
            metadataContainer.appendChild(p);
        }
    }

    // Select all checkbox functionality
    selectAllCheckbox.addEventListener('change', function() {
        // Set a flag to prevent circular updates
        selectAllCheckbox.dataset.updating = 'true';
        
        // Update all visible checkboxes
        var checkboxes = document.querySelectorAll('.row-checkbox');
        for(var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = selectAllCheckbox.checked;
        }
        
        // Clear the flag
        delete selectAllCheckbox.dataset.updating;
        
        // Force update selection info and actions
        updateSelectionUI(checkboxes);
    });
    
    // Helper function to update "select all" checkbox state and selection info
    function updateSelectAllCheckbox() {
        var checkboxes = document.querySelectorAll('.row-checkbox');
        var checkedCount = 0;
        
        for(var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked) {
                checkedCount++;
            }
        }
        
        // Update the select-all checkbox state
        if(checkboxes.length > 0) {
            // Only update the checked state if we're not in the middle of a select-all operation
            if (!selectAllCheckbox.dataset.updating) {
                selectAllCheckbox.checked = checkedCount === checkboxes.length;
                selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
            }
        } else {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        }
        
        // Use the updateSelectionUI helper function
        updateSelectionUI(checkboxes, checkedCount);
    }
    
    // Helper function to update the selection UI based on checkbox state
    function updateSelectionUI(checkboxes, count) {
        // If count is not provided, calculate it
        if (count === undefined) {
            count = 0;
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    count++;
                }
            }
        }
        
        // Update selection info text
        var selectionInfo = document.getElementById('selection-info');
        selectionInfo.textContent = count + ' items selected';
        
        // Show/hide selection info based on whether items are selected
        if (count > 0) {
            selectionInfo.style.visibility = 'visible';
        } else {
            selectionInfo.style.visibility = 'hidden';
        }
        
        // Enable/disable dropdown actions based on selection
        var batchActions = document.querySelectorAll('.batch-action');
        for (var i = 0; i < batchActions.length; i++) {
            if (count > 0) {
                batchActions[i].classList.remove('disabled');
                batchActions[i].style.pointerEvents = 'auto';
            } else {
                batchActions[i].classList.add('disabled');
                batchActions[i].style.pointerEvents = 'none';
            }
        }
    }
    
    // Add event delegation for checkbox changes
    table.addEventListener('change', function(event) {
        if(event.target.classList.contains('row-checkbox')) {
            // Update select all checkbox state without triggering its change event
            updateSelectAllCheckbox();
        }
    });
    
    // Handle batch action clicks
    document.getElementById('batch-actions-menu').addEventListener('click', function(event) {
        if (event.target.classList.contains('batch-action')) {
            event.preventDefault();
            var action = event.target.getAttribute('data-action');
            var selectedRows = getSelectedRows();
            
            switch(action) {
                case 'download':
                    alert('Downloading ' + selectedRows.length + ' items');
                    break;
                case 'share':
                    alert('Sharing ' + selectedRows.length + ' items');
                    break;
                case 'move':
                    // Show the collection modal
                    var modal = document.getElementById('collection-modal');
                    modal.style.display = 'block';
                    break;
                case 'delete':
                    if (confirm('Are you sure you want to delete ' + selectedRows.length + ' items?')) {
                        alert('Items deleted');
                        // In a real application, you would remove the items here
                    }
                    break;
            }
        }
    });
    
    // Helper function to get selected rows (returns stable doc IDs)
    function getSelectedRows() {
        var selectedRows = [];
        var checkboxes = document.querySelectorAll('.row-checkbox');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var row = checkboxes[i].closest('tr');
                var idAttr = row && row.getAttribute('data-doc-id');
                var docId = idAttr != null ? parseInt(idAttr) : NaN;
                if (!isNaN(docId)) selectedRows.push(docId);
            }
        }
        return selectedRows;
    }
    
    // --- Drag and Drop Grouping ---
    var groupBy = [];
    var groupingPanel = document.getElementById('grouping-panel');
    var ths = table.querySelectorAll('th[draggable="true"]');
    ths.forEach(function(th) {
        th.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', th.getAttribute('data-sort'));
            th.classList.add('dragging');
        });
        th.addEventListener('dragend', function(e) {
            th.classList.remove('dragging');
        });
    });
    groupingPanel.addEventListener('dragover', function(e) {
        e.preventDefault();
        groupingPanel.classList.add('dragover');
    });
    groupingPanel.addEventListener('dragleave', function(e) {
        groupingPanel.classList.remove('dragover');
    });
    groupingPanel.addEventListener('drop', function(e) {
        e.preventDefault();
        groupingPanel.classList.remove('dragover');
        var col = e.dataTransfer.getData('text/plain');
        if (col && !groupBy.includes(col)) {
            groupBy.push(col);
            renderGroupingPanel();
            renderGroupedTable();
        }
    });
    function renderGroupingPanel() {
        groupingPanel.innerHTML = '';
        if (groupBy.length === 0) {
            var span = document.createElement('span');
            span.style.color = '#888';
            span.textContent = 'Drag columns here to group';
            groupingPanel.appendChild(span);
        } else {
            groupBy.forEach(function(col, idx) {
                var badge = document.createElement('span');
                badge.className = 'group-badge';
                badge.textContent = col.charAt(0).toUpperCase() + col.slice(1);
                badge.style.background = '#e6f0fa';
                badge.style.border = '1px solid #b3d3f2';
                badge.style.padding = '4px 10px';
                badge.style.borderRadius = '12px';
                badge.style.marginRight = '8px';
                badge.style.cursor = 'pointer';
                badge.title = 'Remove grouping';
                badge.addEventListener('click', function() {
                    groupBy.splice(idx, 1);
                    renderGroupingPanel();
                    renderGroupedTable();
                });
                groupingPanel.appendChild(badge);
            });
        }
    }
    // Placeholder for grouped rendering (to be implemented next)
    function renderGroupedTable() {
        var tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        var filteredData = [];
        for(var i = 0; i < tableData.length; i++) {
            var row = tableData[i];
            // Apply filters and search (reuse logic from applyFiltersAndSearch)
            var searchTerm = searchInput.value.toLowerCase();
            var typeFilter = document.getElementById('filter-type').value;
            var stateFilter = document.getElementById('filter-state').value;
            var industryFilter = document.getElementById('filter-industry').value;
            var yearFilter = document.getElementById('filter-year').value;
            var matchesSearch = false;
            for(var key in row) {
                if(String(row[key]).toLowerCase().includes(searchTerm)) {
                    matchesSearch = true;
                    break;
                }
            }
            var matchesType = !typeFilter || row.type.includes(typeFilter);
            var matchesState = !stateFilter || row.state.includes(stateFilter);
            var matchesIndustry = !industryFilter || row.industry === industryFilter;
            var matchesYear = !yearFilter || row.year === yearFilter;
            if(matchesSearch && matchesType && matchesState && matchesIndustry && matchesYear) {
                filteredData.push(row);
            }
        }
        // Hide grouped columns in thead
        var ths = table.querySelectorAll('thead th');
        ths.forEach(function(th) {
            var sortKey = th.getAttribute('data-sort');
            if (sortKey && groupBy.includes(sortKey)) {
                th.style.display = 'none';
            } else {
                th.style.display = '';
            }
        });
        // If no grouping, render normal rows via the standard renderer and show all columns
        if (groupBy.length === 0) {
            ths.forEach(function(th) { th.style.display = ''; });
            // Delegate to flat renderer to keep columns (including Ingested) aligned
            applyFiltersAndSearch();
            return;
        }
        // Group recursively
        function groupRows(data, groupKeys, level, parentKey) {
            var groups = {};
            data.forEach(function(row) {
                var key = row[groupKeys[level]] || '';
                if (!groups[key]) groups[key] = [];
                groups[key].push(row);
            });
            Object.keys(groups).sort().forEach(function(groupVal) {
                var groupId = (parentKey ? parentKey + '|' : '') + groupVal;
                var groupRow = document.createElement('tr');
                groupRow.className = 'group-header';
                groupRow.setAttribute('data-group-id', groupId);
                groupRow.style.background = '#f7f7f7';
                var td = document.createElement('td');
                td.colSpan = 8 - groupBy.length; // adjust colspan for hidden columns (added New column)
                td.style.fontWeight = 'bold';
                td.style.cursor = 'pointer';
                td.style.paddingLeft = (level * 24 + 8) + 'px'; // Indent by 24px per level, plus base 8px
                // Group checkbox
                var groupCheckbox = document.createElement('input');
                groupCheckbox.type = 'checkbox';
                groupCheckbox.className = 'group-checkbox';
                groupCheckbox.style.marginRight = '8px';
                td.appendChild(groupCheckbox);
                // Group label
                var groupLabel = document.createElement('span');
                groupLabel.textContent = '▶ ' + groupKeys[level].charAt(0).toUpperCase() + groupKeys[level].slice(1) + ': ' + groupVal + ' (' + groups[groupVal].length + ')';
                td.appendChild(groupLabel);
                groupRow.appendChild(td);
                tbody.appendChild(groupRow);
                var expanded = false; // Start collapsed
                groupRow.addEventListener('click', function(e) {
                    if (e.target === groupCheckbox) return; // Don't toggle expand/collapse on checkbox click
                    expanded = !expanded;
                    var rows = tbody.querySelectorAll('tr[data-parent-group^="' + groupId + '"]');
                    rows.forEach(function(r) { r.style.display = expanded ? '' : 'none'; });
                    groupLabel.textContent = (expanded ? '▼ ' : '▶ ') + groupKeys[level].charAt(0).toUpperCase() + groupKeys[level].slice(1) + ': ' + groupVal + ' (' + groups[groupVal].length + ')';
                });
                // Checkbox logic
                groupCheckbox.addEventListener('change', function(e) {
                    e.stopPropagation();
                    var checked = groupCheckbox.checked;
                    // Select/deselect all child checkboxes (rows and subgroups)
                    var rows = tbody.querySelectorAll('tr[data-parent-group^="' + groupId + '"] input[type="checkbox"]');
                    rows.forEach(function(cb) { cb.checked = checked; });
                });
                // Helper to update group checkbox state based on children
                function updateGroupCheckbox() {
                    var rows = tbody.querySelectorAll('tr[data-parent-group^="' + groupId + '"] input[type="checkbox"]');
                    var allChecked = true, anyChecked = false;
                    rows.forEach(function(cb) {
                        if (cb.checked) anyChecked = true;
                        else allChecked = false;
                    });
                    groupCheckbox.checked = allChecked;
                    groupCheckbox.indeterminate = !allChecked && anyChecked;
                }
                // Listen for changes on child checkboxes to update group
                tbody.addEventListener('change', function(e) {
                    if (e.target.closest('tr[data-parent-group^="' + groupId + '"]')) {
                        updateGroupCheckbox();
                    }
                });
                if (level < groupKeys.length - 1) {
                    groupRows(groups[groupVal], groupKeys, level + 1, groupId);
                } else {
                    groups[groupVal].forEach(function(rowData) {
                        var row = document.createElement('tr');
                        row.setAttribute('data-parent-group', groupId);
                        row.style.display = 'none'; // Hide by default
                        row.dataset.docId = rowData.id;
                        var checkboxCell = document.createElement('td');
                        checkboxCell.className = 'checkbox-column';
                        checkboxCell.style.paddingLeft = ((level + 1) * 24 + 8) + 'px'; // Indent row checkbox to match hierarchy
                        var checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.className = 'row-checkbox';
                        checkboxCell.appendChild(checkbox);
                        row.appendChild(checkboxCell);
                        // New column
                        var newCell = document.createElement('td');
                        var state = docState[rowData.id] || { isNew: true, collections: [] };
                        if (state.isNew) {
                            var newBadge = document.createElement('span');
                            newBadge.className = 'badge badge-new';
                            newBadge.textContent = 'New';
                            newCell.appendChild(newBadge);
                        }
                        row.appendChild(newCell);
                        // Title with badges
                        if (!groupBy.includes('title')) {
                            var titleCell = document.createElement('td');
                            titleCell.className = 'cell-with-badges';
                            var badges = document.createElement('span');
                            if (state.collections && state.collections.length > 0) {
                                var max = Math.min(2, state.collections.length);
                                for (var c = 0; c < max; c++) {
                                    var colBadge = document.createElement('span');
                                    colBadge.className = 'badge badge-collection';
                                    colBadge.textContent = state.collections[c];
                                    badges.appendChild(colBadge);
                                }
                                if (state.collections.length > 2) {
                                    var more = document.createElement('span');
                                    more.className = 'collection-chip';
                                    more.textContent = '+' + (state.collections.length - 2);
                                    badges.appendChild(more);
                                }
                            }
                            var titleText = document.createElement('span');
                            titleText.textContent = rowData.title;
                            titleCell.appendChild(badges);
                            titleCell.appendChild(titleText);
                            row.appendChild(titleCell);
                        }
                        // Other non-grouped columns
                        ['type', 'state', 'industry', 'company', 'year'].forEach(function(key) {
                            if (!groupBy.includes(key)) {
                                var cell = document.createElement('td');
                                cell.textContent = rowData[key];
                                row.appendChild(cell);
                            }
                        });
                        // Click to open metadata and mark as seen
                        row.addEventListener('click', function(event) {
                            if (event.target.type === 'checkbox' || event.target.className === 'checkbox-column') return;
                            var metadata = documentMetadata[rowData.id];
                            displayMetadata(metadata);
                            slider.classList.add('open');
                            var st = docState[rowData.id] || { isNew: true, collections: [] };
                            if (st.isNew) {
                                st.isNew = false;
                                docState[rowData.id] = st;
                                saveDocState();
                                // Remove new badge in this row if present
                                var newBadgeEl = row.querySelector('.badge-new');
                                if (newBadgeEl) newBadgeEl.remove();
                                for (var ti = 0; ti < tableData.length; ti++) {
                                    if (tableData[ti].id === rowData.id) { tableData[ti].isNew = false; break; }
                                }
                            }
                        });
                        tbody.appendChild(row);
                    });
                }
                // Hide all child rows and subgroups by default
                setTimeout(function() {
                    var rows = tbody.querySelectorAll('tr[data-parent-group^="' + groupId + '"]');
                    rows.forEach(function(r) { r.style.display = 'none'; });
                }, 0);
            });
        }
        groupRows(filteredData, groupBy, 0, '');
    }
    renderGroupingPanel();
    
    // Initialize the table with sorting and filtering
    initializeTableData();
    // First-run seeding: only some docs are new for demo
    try {
        if (localStorage.getItem('docStateSeeded') !== '1') {
            for (var si = 0; si < tableData.length; si++) {
                var did = tableData[si].id;
                var st = docState[did] || { isNew: true, collections: [] };
                st.isNew = si < 3; // first 3 are new
                docState[did] = st;
                tableData[si].isNew = st.isNew;
            }
            saveDocState();
            localStorage.setItem('docStateSeeded', '1');
        }
    } catch(e) {}
    // Expose globally for rules engine
    window.tableData = tableData;
    applyFiltersAndSearch();
    
    // Initialize batch actions as disabled
    var batchActions = document.querySelectorAll('.batch-action');
    for (var i = 0; i < batchActions.length; i++) {
        batchActions[i].classList.add('disabled');
        batchActions[i].style.pointerEvents = 'none';
    }
    
    // Hide selection info at start
    document.getElementById('selection-info').style.visibility = 'hidden';

    // Collection functionality
    // Sample collections data - in a real app, this would come from a database or API
    var collections = [
        { id: 1, name: "Research Papers", category: "Documentation" },
        { id: 2, name: "Project Proposals", category: "Projects" },
        { id: 3, name: "Technical Guides", category: "Documentation" },
        { id: 4, name: "Reports", category: "Analytics" },
        { id: 5, name: "Archived Documents", category: "Archive" },
        { id: 6, name: "Client Presentations", category: "Client" },
        { id: 7, name: "Internal Memos", category: "Internal" },
        { id: 8, name: "Product Specifications", category: "Products" },
        { id: 9, name: "Market Research", category: "Research" },
        { id: 10, name: "Competitor Analysis", category: "Research" },
        { id: 11, name: "User Feedback", category: "User Experience" },
        { id: 12, name: "Design Assets", category: "Design" },
        { id: 13, name: "Legal Documents", category: "Legal" },
        { id: 14, name: "Financial Reports", category: "Finance" },
        { id: 15, name: "HR Policies", category: "Human Resources" },
        { id: 16, name: "Training Materials", category: "Training" },
        { id: 17, name: "Meeting Notes", category: "Meetings" },
        { id: 18, name: "Roadmaps", category: "Planning" },
        { id: 19, name: "User Manuals", category: "Documentation" },
        { id: 20, name: "Prototypes", category: "Development" }
    ];
    
    // Recently used collections (would be stored in user preferences in a real app)
    var recentCollections = [
        { id: 4, name: "Reports" },
        { id: 10, name: "Competitor Analysis" },
        { id: 17, name: "Meeting Notes" }
    ];
    
    var collectionModal = document.getElementById('collection-modal');
    var newCollectionModal = document.getElementById('new-collection-modal');
    var collectionsList = document.getElementById('collections-list');
    var recentCollectionsList = document.getElementById('recent-collections-list');
    var collectionSearch = document.getElementById('collection-search');
    var closeModalBtn = document.querySelector('.modal-close');
    var closeNewCollectionBtn = document.querySelector('.new-collection-close');
    var cancelMoveBtn = document.getElementById('cancel-move');
    var confirmMoveBtn = document.getElementById('confirm-move');
    var createCollectionBtn = document.getElementById('create-collection');
    var cancelCreateBtn = document.getElementById('cancel-create');
    var confirmCreateBtn = document.getElementById('confirm-create');
    var newCollectionNameInput = document.getElementById('new-collection-name');
    var successNotification = document.getElementById('success-notification');
    var notificationMessage = document.getElementById('notification-message');
    
    var selectedCollectionId = null;
    
    // Populate collections list
    function renderCollections(collectionsToRender) {
        collectionsList.innerHTML = '';
        
        if (collectionsToRender.length === 0) {
            var noResults = document.createElement('div');
            noResults.className = 'collection-item no-results';
            noResults.textContent = 'No collections found';
            collectionsList.appendChild(noResults);
            return;
        }
        
        collectionsToRender.forEach(function(collection) {
            var item = document.createElement('div');
            item.className = 'collection-item';
            item.dataset.id = collection.id;
            
            var radio = document.createElement('input');
            radio.type = 'radio';
            radio.id = 'collection-' + collection.id;
            radio.name = 'collection';
            radio.value = collection.name;
            
            var label = document.createElement('label');
            label.htmlFor = 'collection-' + collection.id;
            
            var folderIcon = document.createElement('span');
            folderIcon.className = 'folder-icon';
            folderIcon.textContent = '📁';
            
            var nameSpan = document.createElement('span');
            nameSpan.textContent = collection.name;
            
            label.appendChild(folderIcon);
            label.appendChild(nameSpan);
            
            item.appendChild(radio);
            item.appendChild(label);
            
            // Handle collection selection
            item.addEventListener('click', function() {
                // Update selected collection
                selectedCollectionId = collection.id;
                
                // Uncheck all other radios
                var allRadios = document.querySelectorAll('.collection-item input[type="radio"]');
                allRadios.forEach(function(r) {
                    r.checked = false;
                });
                
                // Check this radio
                radio.checked = true;
            });
            
            collectionsList.appendChild(item);
        });
    }
    
    // Render recent collections as badges
    function renderRecentCollections() {
        recentCollectionsList.innerHTML = '';
        
        recentCollections.forEach(function(collection) {
            var badge = document.createElement('div');
            badge.className = 'recent-collection-badge';
            badge.dataset.id = collection.id;
            
            var icon = document.createElement('span');
            icon.className = 'icon';
            icon.textContent = '📁';
            
            var name = document.createElement('span');
            name.textContent = collection.name;
            
            badge.appendChild(icon);
            badge.appendChild(name);
            
            badge.addEventListener('click', function() {
                // Set as selected and highlight in main list
                selectedCollectionId = collection.id;
                
                // Find and check the corresponding radio in the main list
                var radio = document.querySelector('#collection-' + collection.id);
                if (radio) {
                    // Uncheck all other radios
                    var allRadios = document.querySelectorAll('.collection-item input[type="radio"]');
                    allRadios.forEach(function(r) {
                        r.checked = false;
                    });
                    
                    radio.checked = true;
                }
            });
            
            recentCollectionsList.appendChild(badge);
        });
    }
    
    // Filter collections based on search
    function filterCollections(searchTerm) {
        if (!searchTerm) {
            renderCollections(collections);
            return;
        }
        
        searchTerm = searchTerm.toLowerCase();
        var filtered = collections.filter(function(collection) {
            return collection.name.toLowerCase().includes(searchTerm) || 
                  (collection.category && collection.category.toLowerCase().includes(searchTerm));
        });
        
        renderCollections(filtered);
    }
    
    // Handle collection search
    collectionSearch.addEventListener('input', function() {
        filterCollections(this.value);
    });
    
    // Close modal when clicking the X
    closeModalBtn.addEventListener('click', function() {
        collectionModal.style.display = 'none';
        selectedCollectionId = null;
    });
    
    // Close modal when clicking Cancel
    cancelMoveBtn.addEventListener('click', function() {
        collectionModal.style.display = 'none';
        selectedCollectionId = null;
    });
    
    // Handle create collection button
    createCollectionBtn.addEventListener('click', function() {
        collectionModal.style.display = 'none';
        newCollectionModal.style.display = 'block';
        newCollectionNameInput.focus();
    });
    
    // Close new collection modal when clicking X
    closeNewCollectionBtn.addEventListener('click', function() {
        newCollectionModal.style.display = 'none';
        collectionModal.style.display = 'block';
    });
    
    // Cancel create collection
    cancelCreateBtn.addEventListener('click', function() {
        newCollectionModal.style.display = 'none';
        collectionModal.style.display = 'block';
        newCollectionNameInput.value = '';
    });
    
    // Create new collection
    confirmCreateBtn.addEventListener('click', function() {
        var newCollectionName = newCollectionNameInput.value.trim();
        
        if (newCollectionName) {
            // Create new collection (in a real app, would save to database)
            var newId = collections.length + 1;
            var newCollection = {
                id: newId,
                name: newCollectionName,
                category: "Custom"
            };
            
            collections.push(newCollection);
            
            // Add to recent collections (in a real app, would update user preferences)
            if (recentCollections.length >= 3) {
                recentCollections.shift(); // Remove oldest
            }
            recentCollections.push(newCollection);
            
            // Close create modal and reopen collections modal
            newCollectionModal.style.display = 'none';
            collectionModal.style.display = 'block';
            
            // Reset input
            newCollectionNameInput.value = '';
            
            // Re-render collections
            renderCollections(collections);
            renderRecentCollections();
            
            // Select the newly created collection
            selectedCollectionId = newId;
            setTimeout(function() {
                var radio = document.querySelector('#collection-' + newId);
                if (radio) {
                    radio.checked = true;
                }
            }, 0);
        } else {
            alert('Please enter a collection name');
        }
    });
    
    // Handle confirm move action
    confirmMoveBtn.addEventListener('click', function() {
        if (selectedCollectionId) {
            var selectedCollection = collections.find(function(c) { return c.id === selectedCollectionId; });
            var selectedRows = getSelectedRows();
            
            // In a real app, would actually move the items to the collection in the database
            // Update localStorage-backed collections for rules engine and doc state badges
            try {
                var lsCollections = JSON.parse(localStorage.getItem('docCollections') || '{}');
                if (!lsCollections[selectedCollection.name]) lsCollections[selectedCollection.name] = [];
                // Add each selected doc into collection and mark doc state
                selectedRows.forEach(function(docId) {
                    var doc = (window.tableData || tableData).find(function(d){ return d.id === docId; });
                    if (!doc) return;
                    // Avoid duplicates in the collection by title+company+year key
                    var exists = lsCollections[selectedCollection.name].some(function(d) {
                        return d.title === doc.title && d.company === doc.company && d.year === doc.year;
                    });
                    if (!exists) lsCollections[selectedCollection.name].push(doc);
                    var state = docState[doc.id] || { isNew: true, collections: [] };
                    if (!state.collections.includes(selectedCollection.name)) {
                        state.collections.push(selectedCollection.name);
                    }
                    docState[doc.id] = state;
                });
                localStorage.setItem('docCollections', JSON.stringify(lsCollections));
                saveDocState();
                // Refresh rows so badges update
                applyFiltersAndSearch();
            } catch(e) {
                console.warn('Failed to update local collections', e);
            }
            
            // Update recent collections (move to front if already exists)
            var existingIndex = recentCollections.findIndex(function(c) { return c.id === selectedCollectionId; });
            if (existingIndex !== -1) {
                recentCollections.splice(existingIndex, 1);
            } else if (recentCollections.length >= 3) {
                recentCollections.shift(); // Remove oldest if at capacity
            }
            
            recentCollections.push(selectedCollection);
            
            // Close the modal
            collectionModal.style.display = 'none';
            selectedCollectionId = null;
            
            // Show success notification
            notificationMessage.textContent = selectedRows.length + ' item(s) moved to "' + selectedCollection.name + '"';
            successNotification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(function() {
                successNotification.classList.remove('show');
            }, 3000);
        } else {
            alert('Please select a collection');
        }
    });
    
    // Close modals when clicking outside of them
    window.addEventListener('click', function(event) {
        if (event.target === collectionModal) {
            collectionModal.style.display = 'none';
            selectedCollectionId = null;
        }
        if (event.target === newCollectionModal) {
            newCollectionModal.style.display = 'none';
            newCollectionNameInput.value = '';
        }
    });
    
    // Initialize collection modal when shown
    document.getElementById('batch-actions-menu').addEventListener('click', function(event) {
        if (event.target.classList.contains('batch-action') && event.target.getAttribute('data-action') === 'move') {
            // Reset search and selection
            collectionSearch.value = '';
            selectedCollectionId = null;
            
            // Render collections and recent collections
            renderCollections(collections);
            renderRecentCollections();
        }
    });
    
    // === Rules Engine Logic ===
    (function() {
        // Guard: if legacy inputs are not present (advanced UI in use), skip this legacy block
        if (!document.getElementById('rule-field')) {
            return;
        }
        var openBtn = document.getElementById('open-rules-engine');
        var modal = document.getElementById('rules-engine-modal');
        var closeBtn = modal.querySelector('.rules-engine-close');
        var addRuleBtn = document.getElementById('add-rule');
        var closeRulesBtn = document.getElementById('close-rules-engine');
        var rulesList = document.getElementById('rules-list');
        var fieldInput = document.getElementById('rule-field');
        var condInput = document.getElementById('rule-condition');
        var valueInput = document.getElementById('rule-value');
        var collectionInput = document.getElementById('rule-collection');

        // Store rules in localStorage
        function getRules() {
            return JSON.parse(localStorage.getItem('docRules') || '[]');
        }
        function saveRules(rules) {
            localStorage.setItem('docRules', JSON.stringify(rules));
        }
        function renderRules() {
            var rules = getRules();
            rulesList.innerHTML = '';
            rules.forEach(function(rule, i) {
                var li = document.createElement('li');
                li.textContent = rule.field + ' ' + rule.condition + ' "' + rule.value + '" → ' + rule.collection;
                var del = document.createElement('button');
                del.textContent = 'Delete';
                del.style.marginLeft = '8px';
                del.onclick = function() {
                    rules.splice(i, 1);
                    saveRules(rules);
                    renderRules();
                    applyRules();
                };
                li.appendChild(del);
                rulesList.appendChild(li);
            });
        }
        function addRule() {
            var rule = {
                field: fieldInput.value,
                condition: condInput.value,
                value: valueInput.value,
                collection: collectionInput.value
            };
            if (!rule.value || !rule.collection) return;
            var rules = getRules();
            rules.push(rule);
            saveRules(rules);
            renderRules();
            applyRules();
            valueInput.value = '';
            collectionInput.value = '';
        }
        // Modal open/close
        openBtn.onclick = function() { modal.style.display = 'block'; renderRules(); };
        closeBtn.onclick = closeRulesBtn.onclick = function() { modal.style.display = 'none'; };
        addRuleBtn.onclick = addRule;
        window.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };

        // === Rules Engine Application ===
        // For demo: collections are just arrays in localStorage, keyed by name
        function getCollections() {
            return JSON.parse(localStorage.getItem('docCollections') || '{}');
        }
        function saveCollections(colls) {
            localStorage.setItem('docCollections', JSON.stringify(colls));
        }
        function applyRules() {
            var rules = getRules();
            var collections = getCollections();
            // Get all docs from tableData (assume global var)
            if (!window.tableData) return;
            // Clear all collections
            Object.keys(collections).forEach(function(c) { collections[c] = []; });
            window.tableData.forEach(function(doc) {
                for (var i = 0; i < rules.length; ++i) {
                    var rule = rules[i];
                    var docVal = (doc[rule.field] || '').toString();
                    var match = false;
                    if (rule.condition === 'equals') match = docVal === rule.value;
                    else if (rule.condition === 'contains') match = docVal.includes(rule.value);
                    else if (rule.condition === 'startsWith') match = docVal.startsWith(rule.value);
                    if (match) {
                        if (!collections[rule.collection]) collections[rule.collection] = [];
                        collections[rule.collection].push(doc);
                        break; // Only move to first matching collection
                    }
                }
            });
            saveCollections(collections);
            // Optionally update UI here (e.g., refresh collections list)
            if (window.renderCollectionsList) window.renderCollectionsList();
        }
        // Run on load
        document.addEventListener('DOMContentLoaded', function() {
            renderRules();
            applyRules();
        });
        // Expose for manual refresh
        window.applyRules = applyRules;
    })();
    // === Slider Rules Panel Controller ===
    (function(){
        if (!rulesPanel) return;
        var tabBuildBtn = document.getElementById('rules-tab-build');
        var tabMatchesBtn = document.getElementById('rules-tab-matches');
        var buildPane = document.getElementById('rules-build');
        var matchesPane = document.getElementById('rules-matches');
        var condHost = document.getElementById('rp-conditions');
        var addCondBtn = document.getElementById('rp-add-cond');
        var logicSel = document.getElementById('rp-rule-logic');
        var collInput = document.getElementById('rp-collection');
        var matchPrev = document.getElementById('rp-match-preview');
        var saveApplyBtn = document.getElementById('rp-save-apply');
        var suggestBtn = document.getElementById('rp-suggest');
        var suggList = document.getElementById('rp-suggestions');
        var rulesUl = document.getElementById('rp-rules-list');
        var matchTerm = document.getElementById('rp-match-term');
        var matchesTable = document.getElementById('rp-matches-table');
        var refreshMatchesBtn = document.getElementById('rp-refresh-matches');
        var backToBuildBtn = document.getElementById('rp-back-to-build');

        var pFieldOptions = [
            { value: 'title', label: 'Title' },
            { value: 'type', label: 'Type' },
            { value: 'state', label: 'State' },
            { value: 'industry', label: 'Industry' },
            { value: 'company', label: 'Company' },
            { value: 'year', label: 'Year' }
        ];
        var pCondOptions = [
            { value: 'equals', label: 'Equals' },
            { value: 'contains', label: 'Contains' },
            { value: 'startsWith', label: 'Starts With' }
        ];
        var pConds = [];

        function pEval(doc, c){
            var v = (doc[c.field]||'').toString();
            if (c.condition==='equals') return v === c.value;
            if (c.condition==='contains') return v.includes(c.value);
            if (c.condition==='startsWith') return v.startsWith(c.value);
            return false;
        }
        function pCount(){
            if (!window.tableData || pConds.length===0) return 0;
            var logic = logicSel.value;
            var n=0;
            for (var i=0;i<tableData.length;i++){
                var d = tableData[i];
                var m = logic==='AND' ? pConds.every(function(c){return pEval(d,c);}) : pConds.some(function(c){return pEval(d,c);});
                if (m) n++;
            }
            return n;
        }
        function pUpdatePreview(){
            var enabled = collInput.value.trim() && pConds.length>0 && pConds.every(function(c){return (c.value||'').trim();});
            saveApplyBtn.disabled = !enabled;
            if (pConds.length===0){ matchPrev.style.display='none'; matchPrev.textContent=''; return; }
            var cnt = pCount();
            matchPrev.style.display='block';
            matchPrev.innerHTML = 'Will match <strong>'+cnt+'</strong> doc'+(cnt===1?'':'s')+'.';
        }
        function pRenderConds(){
            condHost.innerHTML = '';
            pConds.forEach(function(cond, idx){
                var wrap = document.createElement('div');
                wrap.className = 'form-group';
                var fs = document.createElement('select');
                pFieldOptions.forEach(function(o){ var opt=document.createElement('option'); opt.value=o.value; opt.textContent=o.label; if (cond.field===o.value) opt.selected=true; fs.appendChild(opt); });
                var cs = document.createElement('select');
                pCondOptions.forEach(function(o){ var opt=document.createElement('option'); opt.value=o.value; opt.textContent=o.label; if (cond.condition===o.value) opt.selected=true; cs.appendChild(opt); });
                var vi = document.createElement('input'); vi.type='text'; vi.placeholder='Value...'; vi.value=cond.value||'';
                var del = document.createElement('button'); del.textContent='Delete';
                del.onclick=function(){ pConds.splice(idx,1); pRenderConds(); };
                fs.onchange=function(){ cond.field=fs.value; };
                cs.onchange=function(){ cond.condition=cs.value; pUpdatePreview(); };
                vi.oninput=function(){ cond.value=vi.value; pUpdatePreview(); };
                wrap.appendChild(fs); wrap.appendChild(cs); wrap.appendChild(vi); wrap.appendChild(del);
                condHost.appendChild(wrap);
            });
            pUpdatePreview();
        }
        addCondBtn.onclick = function(){ pConds.push({field:'type', condition:'equals', value:''}); pRenderConds(); };
        logicSel.addEventListener('change', pUpdatePreview);
        collInput.addEventListener('input', pUpdatePreview);

        function pRenderRules(){
            var rules = JSON.parse(localStorage.getItem('docRules')||'[]');
            rulesUl.innerHTML='';
            rules.forEach(function(r,i){
                var li=document.createElement('li');
                var text=r.conditions.map(function(c){return c.field+' '+c.condition+' "'+c.value+'"';}).join(' '+r.logic+' ');
                li.textContent = text + ' → ' + r.collection;
                var del=document.createElement('button'); del.textContent='Delete'; del.style.marginLeft='8px';
                del.onclick=function(){ rules.splice(i,1); localStorage.setItem('docRules', JSON.stringify(rules)); pRenderRules(); window.applyRules&&window.applyRules(); };
                li.appendChild(del); rulesUl.appendChild(li);
            });
        }
        function pApplyRules(){ window.applyRules && window.applyRules(); }

        saveApplyBtn.onclick = function(){
            if (!collInput.value.trim() || pConds.length===0) return;
            var rules = JSON.parse(localStorage.getItem('docRules')||'[]');
            rules.push({logic: logicSel.value, conditions: JSON.parse(JSON.stringify(pConds)), collection: collInput.value.trim()});
            localStorage.setItem('docRules', JSON.stringify(rules));
            pConds = []; pRenderConds(); pRenderRules(); pApplyRules();
            try {
                var cnt = pCount();
                var note = document.getElementById('success-notification');
                var msg = document.getElementById('notification-message');
                if (note && msg) { msg.textContent='Rule added and applied ('+cnt+' matches) to "'+collInput.value.trim()+'"'; note.classList.add('show'); setTimeout(function(){ note.classList.remove('show'); }, 2500); }
            } catch(_) {}
            collInput.value=''; pUpdatePreview();
        };

        suggestBtn.onclick = function(){
            suggList.innerHTML='';
            var collections = JSON.parse(localStorage.getItem('docCollections')||'{}');
            var suggestions=[];
            Object.keys(collections).forEach(function(name){
                var docs = collections[name]; if (!docs || docs.length<2) return;
                ['type','industry','company','year','state','title'].forEach(function(field){
                    var vals = docs.map(function(d){return (d[field]||'').toString();});
                    var uniq=Array.from(new Set(vals));
                    if (uniq.length===1 && uniq[0]) suggestions.push({logic:'AND',conditions:[{field:field,condition:'equals',value:uniq[0]}],collection:name,reason:'All share same '+field});
                });
            });
            if (suggestions.length===0){ var none=document.createElement('div'); none.className='rule-suggestion-item'; none.textContent='No suggestions yet.'; suggList.appendChild(none); return; }
            suggestions.slice(0,5).forEach(function(s){
                var item=document.createElement('div'); item.className='rule-suggestion-item';
                var left=document.createElement('div'); left.innerHTML='<strong>'+s.collection+'</strong>: '+s.conditions.map(function(c){return c.field+' '+c.condition+' "'+c.value+'"';}).join(' '+s.logic+' ');
                var btn=document.createElement('button'); btn.textContent='Add';
                btn.onclick=function(){ var rules=JSON.parse(localStorage.getItem('docRules')||'[]'); rules.push(s); localStorage.setItem('docRules', JSON.stringify(rules)); pRenderRules(); pApplyRules(); suggList.innerHTML=''; };
                item.appendChild(left); item.appendChild(btn); suggList.appendChild(item);
            });
        };

        function pShowMatches(){
            var logic = logicSel.value;
            var matchDocs = [];
            if (window.tableData){
                for (var i=0;i<tableData.length;i++){
                    var d=tableData[i];
                    var m = pConds.length===0 ? false : (logic==='AND' ? pConds.every(function(c){return pEval(d,c);}) : pConds.some(function(c){return pEval(d,c);}));
                    if (m) matchDocs.push(d);
                }
            }
            matchesTable.innerHTML = '';
            var countEl=document.createElement('div'); countEl.style.marginBottom='8px'; countEl.textContent = matchDocs.length + ' match'+(matchDocs.length===1?'':'es');
            matchesTable.appendChild(countEl);
            var tbl=document.createElement('table'); tbl.style.width='100%'; tbl.style.borderCollapse='collapse';
            var thead=document.createElement('thead'); var trh=document.createElement('tr');
            ['Title','Type','State','Industry','Company','Year'].forEach(function(h){ var th=document.createElement('th'); th.textContent=h; th.style.border='1px solid #eee'; th.style.background='#fafafa'; th.style.padding='6px'; trh.appendChild(th); });
            thead.appendChild(trh); tbl.appendChild(thead);
            var tb=document.createElement('tbody');
            matchDocs.forEach(function(d){ var tr=document.createElement('tr');
                ['title','type','state','industry','company','year'].forEach(function(k){ var td=document.createElement('td'); td.textContent=d[k]; td.style.border='1px solid #f0f0f0'; td.style.padding='6px'; tr.appendChild(td); });
                tb.appendChild(tr);
            });
            tbl.appendChild(tb);
            matchesTable.appendChild(tbl);
            var t=''; for (var i=0;i<pConds.length;i++){ var v=(pConds[i].value||'').trim(); if (v){ t=v; break; } }
            matchTerm.textContent = t || '—';
        }

        function switchTab(tab){
            if (tab==='build') { tabBuildBtn.classList.add('active'); tabMatchesBtn.classList.remove('active'); buildPane.classList.add('active'); matchesPane.classList.remove('active'); }
            else { tabMatchesBtn.classList.add('active'); tabBuildBtn.classList.remove('active'); matchesPane.classList.add('active'); buildPane.classList.remove('active'); pShowMatches(); }
        }
        tabBuildBtn.onclick = function(){ switchTab('build'); };
        tabMatchesBtn.onclick = function(){ switchTab('matches'); };
        backToBuildBtn.onclick = function(){ switchTab('build'); };
        refreshMatchesBtn.onclick = function(){ pShowMatches(); };

        window.initRulesPanel = function(){
            switchTab('build');
            pRenderConds();
            pRenderRules();
        };
    })();
    // === Advanced Rules Engine Logic ===
    (function() {
        var modal = document.getElementById('rules-engine-modal');
        var addConditionBtn = document.getElementById('add-condition');
        var conditionsListDiv = document.getElementById('rule-conditions-list');
        var logicInput = document.getElementById('rule-logic');
        var collectionInput = document.getElementById('rule-collection');
        var suggestionsDiv = document.getElementById('collection-suggestions');
    var matchPreview = document.getElementById('rule-match-preview');
    var addRuleBtn = document.getElementById('add-rule');
    var suggestBtn = document.getElementById('suggest-rules');
    var suggestionsList = document.getElementById('rule-suggestions');
        var rulesList = document.getElementById('rules-list');
        var fieldOptions = [
            { value: 'type', label: 'Type' },
            { value: 'state', label: 'State' },
            { value: 'industry', label: 'Industry' },
            { value: 'company', label: 'Company' },
            { value: 'year', label: 'Year' }
        ];
        var condOptions = [
            { value: 'equals', label: 'Equals' },
            { value: 'contains', label: 'Contains' },
            { value: 'startsWith', label: 'Starts With' }
        ];
        var tempConditions = [];

        function evalConditionsOnDoc(doc, cond) {
            var docVal = (doc[cond.field] || '').toString();
            if (cond.condition === 'equals') return docVal === cond.value;
            if (cond.condition === 'contains') return docVal.includes(cond.value);
            if (cond.condition === 'startsWith') return docVal.startsWith(cond.value);
            return false;
        }

        function computeMatchCount() {
            if (!window.tableData || tempConditions.length === 0) return 0;
            var logic = logicInput.value;
            var count = 0;
            for (var i = 0; i < window.tableData.length; i++) {
                var doc = window.tableData[i];
                var match = logic === 'AND'
                    ? tempConditions.every(function(c){ return evalConditionsOnDoc(doc, c); })
                    : tempConditions.some(function(c){ return evalConditionsOnDoc(doc, c); });
                if (match) count++;
            }
            return count;
        }

        function updateMatchPreviewAndCta() {
            var enabled = collectionInput.value.trim().length > 0 && tempConditions.length > 0 && tempConditions.every(function(c){ return (c.value||'').trim().length > 0; });
            addRuleBtn.disabled = !enabled;
            var count = computeMatchCount();
            if (tempConditions.length === 0) {
                matchPreview.style.display = 'none';
                matchPreview.textContent = '';
                return;
            }
            matchPreview.style.display = 'block';
            matchPreview.innerHTML = 'Will match <strong>' + count + '</strong> document' + (count===1?'':'s') + '. <a href="#" id="view-matches-link">View matches</a>';
            // Hook view matches to filter table via a quick search heuristic
            setTimeout(function(){
                var link = document.getElementById('view-matches-link');
                if (link) {
                    link.onclick = function(e){
                        e.preventDefault();
                        try {
                            // Quick heuristic: put first non-empty value into global search
                            var searchEl = document.getElementById('search-input');
                            // Save current search to restore later
                            lastSearchState.term = searchEl.value;
                            lastSearchState.active = true;
                            var chosen = '';
                            for (var i=0;i<tempConditions.length;i++) {
                                var v = (tempConditions[i].value||'').trim();
                                if (v) { chosen = v; break; }
                            }
                            if (chosen) {
                                searchEl.value = chosen;
                                var banner = document.getElementById('view-matches-banner');
                                var termEl = document.getElementById('view-matches-term');
                                if (banner && termEl) {
                                    termEl.textContent = chosen;
                                    banner.style.display = 'block';
                                }
                                // Hook restore and back-to-rules buttons
                                var restoreBtn = document.getElementById('restore-view');
                                if (restoreBtn) {
                                    restoreBtn.onclick = function(){
                                        try {
                                            searchEl.value = lastSearchState.term || '';
                                            if (typeof applyFiltersAndSearch === 'function') applyFiltersAndSearch();
                                            var b = document.getElementById('view-matches-banner');
                                            if (b) b.style.display = 'none';
                                        } catch(_) {}
                                        lastSearchState.active = false;
                                    };
                                }
                                var backBtn = document.getElementById('back-to-rules');
                                if (backBtn) {
                                    backBtn.onclick = function(){
                                        try {
                                            var modalEl = document.getElementById('rules-engine-modal');
                                            if (modalEl) {
                                                modalEl.style.display = 'block';
                                                // Keep banner visible; user can still restore if desired
                                            }
                                        } catch(_) {}
                                    };
                                }
                            }
                            // Close modal to show results
                            modal.style.display = 'none';
                            // Reapply filters
                            if (typeof applyFiltersAndSearch === 'function') applyFiltersAndSearch();
                        } catch(_) {}
                        return false;
                    };
                }
            }, 0);
        }
    function renderConditions() {
            conditionsListDiv.innerHTML = '';
            tempConditions.forEach(function(cond, idx) {
                var div = document.createElement('div');
                div.className = 'form-group';
                var fieldSel = document.createElement('select');
                fieldOptions.forEach(function(opt) {
                    var o = document.createElement('option');
                    o.value = opt.value; o.textContent = opt.label;
                    if (cond.field === opt.value) o.selected = true;
                    fieldSel.appendChild(o);
                });
                var condSel = document.createElement('select');
                condOptions.forEach(function(opt) {
                    var o = document.createElement('option');
                    o.value = opt.value; o.textContent = opt.label;
                    if (cond.condition === opt.value) o.selected = true;
                    condSel.appendChild(o);
                });
                var valInput = document.createElement('input');
                valInput.type = 'text';
                valInput.value = cond.value;
                valInput.placeholder = 'Value...';
                var delBtn = document.createElement('button');
                delBtn.textContent = 'Delete';
                delBtn.onclick = function() {
                    tempConditions.splice(idx, 1);
                    renderConditions();
                };
                fieldSel.onchange = function() { cond.field = fieldSel.value; };
                condSel.onchange = function() { cond.condition = condSel.value; updateMatchPreviewAndCta(); };
                valInput.oninput = function() { cond.value = valInput.value; updateMatchPreviewAndCta(); };
                div.appendChild(fieldSel);
                div.appendChild(condSel);
                div.appendChild(valInput);
                div.appendChild(delBtn);
                conditionsListDiv.appendChild(div);
            });
            updateMatchPreviewAndCta();
        }
        addConditionBtn.onclick = function() {
            tempConditions.push({ field: 'type', condition: 'equals', value: '' });
            renderConditions();
        };
        // Update preview upon logic change
        logicInput.addEventListener('change', updateMatchPreviewAndCta);
        collectionInput.addEventListener('input', updateMatchPreviewAndCta);
        // Overwrite addRule logic
        addRuleBtn.onclick = function() {
            var logic = logicInput.value;
            var collection = collectionInput.value;
            if (!collection || tempConditions.length === 0) return;
            var rules = JSON.parse(localStorage.getItem('docRules') || '[]');
            rules.push({ logic: logic, conditions: JSON.parse(JSON.stringify(tempConditions)), collection: collection });
            localStorage.setItem('docRules', JSON.stringify(rules));
            tempConditions = [];
            renderConditions();
            renderRules();
            applyRules();
            // Feedback toast
            try {
                var count = computeMatchCount();
                var note = document.getElementById('success-notification');
                var msg = document.getElementById('notification-message');
                if (note && msg) {
                    msg.textContent = 'Rule added and applied (' + count + ' match' + (count===1?'':'es') + ') to "' + collection + '"';
                    note.classList.add('show');
                    setTimeout(function(){ note.classList.remove('show'); }, 2500);
                }
            } catch(_) {}
            collectionInput.value = '';
            // Keep modal open for chaining rules
            updateMatchPreviewAndCta();
        };
        // Render rules list
        function renderRules() {
            var rules = JSON.parse(localStorage.getItem('docRules') || '[]');
            rulesList.innerHTML = '';
            rules.forEach(function(rule, i) {
                var li = document.createElement('li');
                var conds = rule.conditions.map(function(c) {
                    return c.field + ' ' + c.condition + ' "' + c.value + '"';
                }).join(' ' + rule.logic + ' ');
                li.textContent = conds + ' → ' + rule.collection;
                var del = document.createElement('button');
                del.textContent = 'Delete';
                del.style.marginLeft = '8px';
                del.onclick = function() {
                    rules.splice(i, 1);
                    localStorage.setItem('docRules', JSON.stringify(rules));
                    renderRules();
                    applyRules();
                };
                li.appendChild(del);
                rulesList.appendChild(li);
            });
        }
        // Overwrite applyRules logic
        window.applyRules = function() {
            var rules = JSON.parse(localStorage.getItem('docRules') || '[]');
            var collections = JSON.parse(localStorage.getItem('docCollections') || '{}');
            if (!window.tableData) return;
            Object.keys(collections).forEach(function(c) { collections[c] = []; });
            window.tableData.forEach(function(doc) {
                for (var i = 0; i < rules.length; ++i) {
                    var rule = rules[i];
                    var match = false;
                    if (rule.logic === 'AND') {
                        match = rule.conditions.every(function(cond) {
                            var docVal = (doc[cond.field] || '').toString();
                            if (cond.condition === 'equals') return docVal === cond.value;
                            if (cond.condition === 'contains') return docVal.includes(cond.value);
                            if (cond.condition === 'startsWith') return docVal.startsWith(cond.value);
                            return false;
                        });
                    } else {
                        match = rule.conditions.some(function(cond) {
                            var docVal = (doc[cond.field] || '').toString();
                            if (cond.condition === 'equals') return docVal === cond.value;
                            if (cond.condition === 'contains') return docVal.includes(cond.value);
                            if (cond.condition === 'startsWith') return docVal.startsWith(cond.value);
                            return false;
                        });
                    }
                    if (match) {
                        if (!collections[rule.collection]) collections[rule.collection] = [];
                        collections[rule.collection].push(doc);
                        // Also ensure docState reflects this membership
                        try {
                            var st = docState[doc.id] || { isNew: true, collections: [] };
                            if (!st.collections.includes(rule.collection)) {
                                st.collections.push(rule.collection);
                                docState[doc.id] = st;
                            }
                        } catch(e) { /* ignore */ }
                        break;
                    }
                }
            });
            localStorage.setItem('docCollections', JSON.stringify(collections));
            try { saveDocState(); } catch(e) {}
            if (window.renderCollectionsList) window.renderCollectionsList();
            // Refresh rows so badges reflect changes
            try { applyFiltersAndSearch(); } catch(e) {}
        };
        // Suggest simple rules based on current documents and existing collections
        suggestBtn.onclick = function() {
            suggestionsList.innerHTML = '';
            // Heuristic: for each existing collection, find common attributes among its docs and suggest equals/contains rules
            var collections = JSON.parse(localStorage.getItem('docCollections') || '{}');
            var suggestions = [];
            Object.keys(collections).forEach(function(name) {
                var docs = collections[name];
                if (!docs || docs.length < 2) return; // need at least 2 to see pattern
                var fields = ['type','industry','company','year','state','title'];
                fields.forEach(function(field) {
                    var values = docs.map(function(d){return (d[field]||'').toString();});
                    var unique = Array.from(new Set(values));
                    if (unique.length === 1 && unique[0]) {
                        suggestions.push({logic:'AND', conditions:[{field:field, condition:'equals', value:unique[0]}], collection:name, reason:'All in collection share same '+field});
                    } else {
                        // contains: top frequent token for state or title words
                        if (field === 'company' || field === 'type' || field === 'industry' || field === 'year') return;
                        var tokenCounts = {};
                        values.forEach(function(v){ v.split(/[ ,;-]+/).forEach(function(t){ if(!t) return; tokenCounts[t]=(tokenCounts[t]||0)+1; }); });
                        var best = Object.keys(tokenCounts).sort(function(a,b){return tokenCounts[b]-tokenCounts[a];})[0];
                        if (best && tokenCounts[best] >= Math.ceil(docs.length*0.6)) {
                            suggestions.push({logic:'AND', conditions:[{field:field, condition:'contains', value:best}], collection:name, reason:'Most docs contain "'+best+'" in '+field});
                        }
                    }
                });
            });
            if (suggestions.length === 0) {
                var none = document.createElement('div');
                none.className = 'rule-suggestion-item';
                none.textContent = 'No suggestions yet. Move a few docs into a collection to learn patterns.';
                suggestionsList.appendChild(none);
                return;
            }
            suggestions.slice(0,5).forEach(function(sug, idx){
                var item = document.createElement('div');
                item.className = 'rule-suggestion-item';
                var left = document.createElement('div');
                left.innerHTML = '<strong>'+sug.collection+'</strong>: '+sug.conditions.map(function(c){return c.field+' '+c.condition+' "'+c.value+'"';}).join(' '+sug.logic+' ') + '<div class="meta">'+sug.reason+'</div>';
                var btn = document.createElement('button');
                btn.textContent = 'Add';
                btn.onclick = function(){
                    var rules = JSON.parse(localStorage.getItem('docRules') || '[]');
                    rules.push({logic:sug.logic, conditions:sug.conditions, collection:sug.collection});
                    localStorage.setItem('docRules', JSON.stringify(rules));
                    renderRules();
                    window.applyRules();
                    // Clear suggestions after adding to avoid duplication
                    suggestionsList.innerHTML='';
                };
                item.appendChild(left);
                item.appendChild(btn);
                suggestionsList.appendChild(item);
            });
        };
        // Modal open/close
        var openBtn = document.getElementById('open-rules-engine');
        var closeBtn = modal.querySelector('.rules-engine-close');
        var closeRulesBtn = document.getElementById('close-rules-engine');
        openBtn.onclick = function() {
            try {
                slider.classList.add('open');
                if (rulesPanel) {
                    rulesPanel.style.display = 'block';
                    if (typeof window.initRulesPanel === 'function') window.initRulesPanel();
                    return;
                }
            } catch(_) {}
            modal.style.display = 'block'; renderRules(); renderConditions();
        };
        closeBtn.onclick = closeRulesBtn.onclick = function() { modal.style.display = 'none'; tempConditions = []; renderConditions(); };
        window.onclick = function(e) { if (e.target === modal) { modal.style.display = 'none'; tempConditions = []; renderConditions(); } };
        // Keyboard: Enter to Save & Apply when enabled; Esc to close
        modal.addEventListener('keydown', function(e){
            if (e.key === 'Enter' && !addRuleBtn.disabled) {
                e.preventDefault();
                addRuleBtn.click();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeRulesBtn.click();
            }
        });
    // Initialize immediately (we are already inside DOMContentLoaded of the main script)
    renderRules();
    window.applyRules();
        
        // Collection suggestions logic
        collectionInput.addEventListener('input', function() {
            var val = collectionInput.value.toLowerCase();
            var collections = Object.keys(JSON.parse(localStorage.getItem('docCollections') || '{}'));
            suggestionsDiv.innerHTML = '';
            if (!val || collections.length === 0) return;
            var matches = collections.filter(function(c) { return c.toLowerCase().includes(val); });
            if (matches.length === 0) return;
            var ul = document.createElement('ul');
            ul.style.position = 'absolute';
            ul.style.background = '#fff';
            ul.style.border = '1px solid #ccc';
            ul.style.width = '100%';
            ul.style.zIndex = 1001;
            ul.style.listStyle = 'none';
            ul.style.margin = 0;
            ul.style.padding = 0;
            matches.forEach(function(c) {
                var li = document.createElement('li');
                li.textContent = c;
                li.style.padding = '6px 12px';
                li.style.cursor = 'pointer';
                li.onmousedown = function(e) {
                    e.preventDefault();
                    collectionInput.value = c;
                    suggestionsDiv.innerHTML = '';
                };
                ul.appendChild(li);
            });
            suggestionsDiv.appendChild(ul);
        });
        collectionInput.addEventListener('blur', function() {
            setTimeout(function() { suggestionsDiv.innerHTML = ''; }, 150);
        });
    })();
});
