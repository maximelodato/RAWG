import React from 'react';
import './PlatformFilter.scss';

const PlatformFilter = ({ selected, onSelect }) => {
  const platforms = ['PlayStation', 'Xbox', 'PC', 'Switch'];

  return (
    <div className="platform-filter">
      <select value={selected} onChange={e => onSelect(e.target.value)}>
        <option value="">Platform: any</option>
        {platforms.map(platform => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlatformFilter;
