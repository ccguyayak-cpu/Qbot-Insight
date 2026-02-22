import { useState } from 'react';
import { SearchResults } from './components/SearchResults';
import { Sidebar } from './components/Sidebar';

export type SidebarMode = 'hidden' | 'single' | 'compare';

export interface SelectedPage {
  id: string;
  title: string;
  url: string;
  snippet: string;
  type: string;
}

function App() {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('hidden');
  const [selectedPages, setSelectedPages] = useState<SelectedPage[]>([]);
  const [compareMode, setCompareMode] = useState(false);

  const handleSummarize = (page: SelectedPage) => {
    setSelectedPages([page]);
    setSidebarMode('single');
    setCompareMode(false);
  };

  const handleStartCompare = () => {
    setCompareMode(true);
    setSelectedPages([]);
    setSidebarMode('hidden');
  };

  const handleSelectForCompare = (page: SelectedPage) => {
    if (selectedPages.find(p => p.id === page.id)) {
      setSelectedPages(selectedPages.filter(p => p.id !== page.id));
    } else {
      setSelectedPages([...selectedPages, page]);
    }
  };

  const handleConfirmCompare = () => {
    if (selectedPages.length >= 2) {
      setSidebarMode('compare');
      setCompareMode(false);
    }
  };

  const handleCancelCompare = () => {
    setCompareMode(false);
    setSelectedPages([]);
  };

  const handleCloseSidebar = () => {
    setSidebarMode('hidden');
    setSelectedPages([]);
    setCompareMode(false);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* 左侧：搜索结果页面 */}
      <div className={`flex-1 transition-all duration-300 ${
        sidebarMode !== 'hidden' ? 'mr-0 sm:mr-[400px]' : ''
      }`}>
        <SearchResults
          onSummarize={handleSummarize}
          onStartCompare={handleStartCompare}
          onSelectForCompare={handleSelectForCompare}
          compareMode={compareMode}
          selectedPages={selectedPages}
          onConfirmCompare={handleConfirmCompare}
          onCancelCompare={handleCancelCompare}
        />
      </div>

      {/* 右侧：AI助手侧边栏 */}
      <Sidebar
        mode={sidebarMode}
        selectedPages={selectedPages}
        onClose={handleCloseSidebar}
      />
    </div>
  );
}

export default App;