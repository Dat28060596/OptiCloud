import os

filepath = 'components/CostExplorer.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("import React, { useState, useMemo } from 'react';", "import React, { useState, useMemo, useCallback } from 'react';")

new_dropdown_code = """
interface FilterDropdownProps {
  category: FilterCategory;
  label: string;
  isOpen: boolean;
  activeFilterValues: string[];
  categoryOptions: string[];
  onToggleDropdown: (category: FilterCategory) => void;
  onFilterToggle: (category: FilterCategory, value: string) => void;
  closeDropdown: () => void;
}

const FilterDropdown = React.memo(({
  category, label, isOpen, activeFilterValues, categoryOptions, onToggleDropdown, onFilterToggle, closeDropdown
}: FilterDropdownProps) => {
  const isActive = activeFilterValues.length > 0;

  return (
    <div className="relative">
      <button
        onClick={() => onToggleDropdown(category)}
        className={`px-3 py-1.5 border rounded-md text-sm flex items-center transition-colors
          ${isActive
            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium'
            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'}
        `}
      >
        {label}
        {isActive && (
          <span className="ml-2 bg-indigo-200 text-indigo-800 text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFilterValues.length}
          </span>
        )}
        <ChevronDown size={14} className={`ml-2 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDropdown} />
          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 z-20 max-h-64 overflow-y-auto py-1 animate-in zoom-in-95 duration-100">
            {categoryOptions.map(opt => (
              <div
                key={opt}
                onClick={() => onFilterToggle(category, opt)}
                className="px-4 py-2 hover:bg-slate-50 cursor-pointer flex items-center justify-between text-sm text-slate-700"
              >
                <span className="truncate mr-2">{opt}</span>
                {activeFilterValues.includes(opt) && <Check size={14} className="text-indigo-600 flex-shrink-0" />}
              </div>
            ))}
            {categoryOptions.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-400">No options found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
});

"""

content = content.replace("const CostExplorer: React.FC<CostExplorerProps> = ({ data, onDeleteService, onAddService }) => {", new_dropdown_code + "\nconst CostExplorer: React.FC<CostExplorerProps> = ({ data, onDeleteService, onAddService }) => {")

old_handleFilterToggle = """  const handleFilterToggle = (category: FilterCategory, value: string) => {
    setActiveFilters(prev => {
      const current = prev[category];
      const next = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: next };
    });
  };"""

new_handleFilterToggle = """  const handleFilterToggle = useCallback((category: FilterCategory, value: string) => {
    setActiveFilters(prev => {
      const current = prev[category];
      const next = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: next };
    });
  }, []);

  const handleToggleDropdown = useCallback((category: FilterCategory) => {
    setOpenDropdown(prev => prev === category ? null : category);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null);
  }, []);"""

content = content.replace(old_handleFilterToggle, new_handleFilterToggle)

old_dropdown_start = "  // Helper component for dropdown"
old_dropdown_end = "    );\n  };\n"

start_idx = content.find(old_dropdown_start)
end_idx = content.find(old_dropdown_end, start_idx) + len(old_dropdown_end)

if start_idx != -1 and end_idx > start_idx:
    content = content[:start_idx] + content[end_idx:]

old_usages = """        <FilterDropdown category="service" label="Service" />
        <FilterDropdown category="region" label="Region" />
        <FilterDropdown category="account" label="Account" />
        <FilterDropdown category="tag" label="Tag" />"""

new_usages = """        <FilterDropdown category="service" label="Service" isOpen={openDropdown === 'service'} activeFilterValues={activeFilters.service} categoryOptions={options.service} onToggleDropdown={handleToggleDropdown} onFilterToggle={handleFilterToggle} closeDropdown={closeDropdown} />
        <FilterDropdown category="region" label="Region" isOpen={openDropdown === 'region'} activeFilterValues={activeFilters.region} categoryOptions={options.region} onToggleDropdown={handleToggleDropdown} onFilterToggle={handleFilterToggle} closeDropdown={closeDropdown} />
        <FilterDropdown category="account" label="Account" isOpen={openDropdown === 'account'} activeFilterValues={activeFilters.account} categoryOptions={options.account} onToggleDropdown={handleToggleDropdown} onFilterToggle={handleFilterToggle} closeDropdown={closeDropdown} />
        <FilterDropdown category="tag" label="Tag" isOpen={openDropdown === 'tag'} activeFilterValues={activeFilters.tag} categoryOptions={options.tag} onToggleDropdown={handleToggleDropdown} onFilterToggle={handleFilterToggle} closeDropdown={closeDropdown} />"""

content = content.replace(old_usages, new_usages)

with open(filepath, 'w') as f:
    f.write(content)
