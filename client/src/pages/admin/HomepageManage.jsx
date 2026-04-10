import React, { useState, useRef, useEffect } from 'react';
import { useSiteConfig } from '../../contexts/SiteConfigContext';
import {
  GripVertical, Eye, EyeOff, Image as ImageIcon, Upload, Trash2, Plus,
  Layout, BarChart3, Palette, Megaphone, ExternalLink, MousePointer2,
  Check, ChevronRight, X, Link as LinkIcon
} from 'lucide-react';
import { HiOutlineCheck } from 'react-icons/hi';

const HomepageManage = () => {
  const { config, updateConfig } = useSiteConfig();
  const [savedSection, setSavedSection] = useState('');

  const homepage = config?.homepage || {
    heroBg: '',
    heroTitle: '',
    heroSubtitle: '',
    announcement: { text: '', link: '', bgColor: '#ff6b35', enabled: false },
    banners: [],
    sections: [
      { id: 'brands', name: '品牌展示', enabled: true },
      { id: 'banners', name: '广告轮播', enabled: true },
      { id: 'featured', name: '精选车辆', enabled: true },
      { id: 'whyUs', name: '优势介绍', enabled: true },
      { id: 'stats', name: '数据统计', enabled: true },
      { id: 'cta', name: '行动号召', enabled: true },
    ],
    stats: { vehicles: '10,000+', countries: '50+', partners: '5,000+', experience: '15+' },
    theme: { primaryColor: '#1a73e8', secondaryColor: '#ff6b35', heroOverlay: 'blue' },
  };

  const showSaved = (section) => {
    setSavedSection(section);
    setTimeout(() => setSavedSection(''), 2000);
  };

  // --- Common Handlers ---
  const handleUpdate = (field, value) => {
    updateConfig('homepage', { ...homepage, [field]: value });
  };

  const handleFileUpload = (file, callback) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target.result);
    reader.readAsDataURL(file);
  };

  // --- Section 1: Drag and Drop Logic ---
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSections = [...homepage.sections];
    const draggedItem = newSections[draggedIndex];
    newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    handleUpdate('sections', newSections);
  };

  const toggleSection = (id) => {
    const newSections = homepage.sections.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    handleUpdate('sections', newSections);
  };

  // --- Section 2: Hero State ---
  const [heroForm, setHeroForm] = useState({
    heroBg: homepage.heroBg,
    heroTitle: homepage.heroTitle,
    heroSubtitle: homepage.heroSubtitle,
    heroOverlay: homepage.theme.heroOverlay
  });

  const [popularSearches, setPopularSearches] = useState(
    homepage.popularSearches || [
      { id: '1', text: 'BYD EV', link: '/vehicles?brand=BYD' },
      { id: '2', text: 'Electric Cars', link: '/vehicles?fuel=Electric' },
      { id: '3', text: 'Under $10k', link: '/vehicles?maxPrice=10000' }
    ]
  );

  useEffect(() => {
    setHeroForm({
      heroBg: homepage.heroBg,
      heroTitle: homepage.heroTitle,
      heroSubtitle: homepage.heroSubtitle,
      heroOverlay: homepage.theme.heroOverlay
    });
    if (homepage.popularSearches) {
      setPopularSearches(homepage.popularSearches);
    }
  }, [homepage.heroBg, homepage.heroTitle, homepage.heroSubtitle, homepage.theme.heroOverlay, homepage.popularSearches]);

  const saveHero = () => {
    updateConfig('homepage', {
      ...homepage,
      heroBg: heroForm.heroBg,
      heroTitle: heroForm.heroTitle,
      heroSubtitle: heroForm.heroSubtitle,
      popularSearches: popularSearches,
      theme: { ...homepage.theme, heroOverlay: heroForm.heroOverlay }
    });
    showSaved('hero');
  };

  const addPopularSearch = () => {
    setPopularSearches([...popularSearches, { id: Date.now().toString(), text: '', link: '' }]);
  };

  const updatePopularSearch = (id, field, value) => {
    setPopularSearches(popularSearches.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removePopularSearch = (id) => {
    setPopularSearches(popularSearches.filter(item => item.id !== id));
  };

  // --- Section 3: Announcement State ---
  const [annForm, setAnnForm] = useState(homepage.announcement);
  useEffect(() => { setAnnForm(homepage.announcement); }, [homepage.announcement]);
  const saveAnnouncement = () => {
    handleUpdate('announcement', annForm);
    showSaved('ann');
  };

  // --- Section 4: Banners State ---
  const [newBanner, setNewBanner] = useState({ title: '', image: '', link: '', enabled: true });
  const bannerFileRef = useRef(null);

  const addBanner = () => {
    if (!newBanner.title || !newBanner.image) {
      alert('请填写标题并上传图片');
      return;
    }
    const updated = [...homepage.banners, { ...newBanner, id: Date.now().toString() }];
    handleUpdate('banners', updated);
    setNewBanner({ title: '', image: '', link: '', enabled: true });
    showSaved('banners');
  };

  const removeBanner = (id) => {
    handleUpdate('banners', homepage.banners.filter(b => b.id !== id));
  };

  const toggleBanner = (id) => {
    handleUpdate('banners', homepage.banners.map(b => b.id === id ? { ...b, enabled: !b.enabled } : b));
  };

  // --- Section 5: Stats State ---
  const [statsForm, setStatsForm] = useState(homepage.stats);
  useEffect(() => { setStatsForm(homepage.stats); }, [homepage.stats]);
  const saveStats = () => {
    handleUpdate('stats', statsForm);
    showSaved('stats');
  };

  // --- Section 6: Theme Color State ---
  const [themeForm, setThemeForm] = useState(homepage.theme);
  useEffect(() => { setThemeForm(homepage.theme); }, [homepage.theme]);
  const saveTheme = () => {
    handleUpdate('theme', themeForm);
    showSaved('theme');
  };

  // --- Helper UI Components ---
  const Toggle = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
    >
      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  const ColorCircle = ({ color, selected, onClick }) => (
    <button
      onClick={() => onClick(color)}
      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${selected === color ? 'border-gray-800 scale-110 shadow-sm' : 'border-transparent'}`}
      style={{ backgroundColor: color }}
    >
      {selected === color && <Check className="w-4 h-4 text-white drop-shadow-sm" />}
    </button>
  );

  const SaveBadge = ({ show }) => show ? (
    <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-md animate-fade-in">
      <HiOutlineCheck className="w-3.5 h-3.5 mr-1" /> 已保存
    </span>
  ) : null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans pb-24 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">页面装修</h1>
          <p className="text-gray-500 text-sm mt-1">管理首页模块、视觉风格及核心内容展示</p>
        </div>
      </div>

      {/* Section 1: 页面结构预览 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-800">页面结构预览</h3>
          </div>
          <span className="text-xs text-gray-400">上下拖拽调整顺序，点击眼睛切换显示</span>
        </div>
        <div className="p-8">
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            {homepage.sections.map((section, index) => (
              <div
                key={section.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={() => setDraggedIndex(null)}
                className={`flex items-center justify-between h-12 px-4 rounded-xl border transition-all cursor-move ${
                  draggedIndex === index ? 'opacity-40 border-blue-400 bg-blue-50' : 'bg-white border-gray-100 shadow-sm hover:border-gray-200'
                } ${!section.enabled && 'bg-gray-50 opacity-60'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1 h-6 rounded-full ${
                    section.id === 'featured' ? 'bg-orange-500' :
                    section.id === 'stats' ? 'bg-blue-500' :
                    section.id === 'banners' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <GripVertical className="w-4 h-4 text-gray-300" />
                  <span className="font-medium text-sm text-gray-700">{section.name}</span>
                </div>
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    section.enabled ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {section.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Hero 大图 & 文案 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-800">Hero 大图 & 文案</h3>
          </div>
          <SaveBadge show={savedSection === 'hero'} />
        </div>
        <div className="p-6 space-y-6">
          <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shadow-inner group">
            {heroForm.heroBg ? (
              <>
                <img src={heroForm.heroBg} alt="Hero Preview" className="w-full h-full object-cover" />
                <div className={`absolute inset-0 flex items-center px-12 ${
                  heroForm.heroOverlay === 'blue' ? 'bg-gradient-to-r from-blue-900/60 to-transparent' :
                  heroForm.heroOverlay === 'green' ? 'bg-gradient-to-r from-green-900/60 to-transparent' :
                  'bg-gradient-to-r from-black/60 to-transparent'
                }`}>
                  <div className="text-white max-w-md">
                    <h2 className="text-2xl font-bold mb-2">{heroForm.heroTitle || 'Your Gateway to Quality Cars'}</h2>
                    <p className="text-sm opacity-80">{heroForm.heroSubtitle || 'Professional export services for international buyers'}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                <p className="text-sm">尚未设置背景图</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">背景图片 URL</label>
                <input
                  type="text"
                  value={heroForm.heroBg}
                  onChange={(e) => setHeroForm({ ...heroForm, heroBg: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">或本地上传</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="hero-upload"
                    onChange={(e) => handleFileUpload(e.target.files[0], (data) => setHeroForm({ ...heroForm, heroBg: data }))}
                  />
                  <label
                    htmlFor="hero-upload"
                    className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-all text-sm font-bold text-gray-500"
                  >
                    <Upload className="w-4 h-4" /> 选择图片文件
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">自定义主标题</label>
                <input
                  type="text"
                  value={heroForm.heroTitle}
                  onChange={(e) => setHeroForm({ ...heroForm, heroTitle: e.target.value })}
                  placeholder="留空则使用多语言默认标题"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">自定义副标题</label>
                <input
                  type="text"
                  value={heroForm.heroSubtitle}
                  onChange={(e) => setHeroForm({ ...heroForm, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-bold text-gray-700">热门搜索快捷标签 (Hero下方)</label>
              <button onClick={addPopularSearch} className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1.5 rounded-lg font-semibold">
                <Plus className="w-3.5 h-3.5" /> 添加标签
              </button>
            </div>
            <div className="space-y-3">
              {popularSearches.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="显示文字 (如: BYD EV)"
                      value={item.text}
                      onChange={(e) => updatePopularSearch(item.id, 'text', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    />
                  </div>
                  <div className="flex-[2]">
                    <input
                      type="text"
                      placeholder="跳转链接 (如: /vehicles?brand=BYD)"
                      value={item.link}
                      onChange={(e) => updatePopularSearch(item.id, 'link', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    />
                  </div>
                  <button onClick={() => removePopularSearch(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {popularSearches.length === 0 && <p className="text-sm text-gray-400 italic py-2">暂无标签，点击右上角添加</p>}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-700">蒙层样式:</span>
              <div className="flex gap-3">
                {[
                  { id: 'blue', label: '蓝色渐变', class: 'bg-blue-600' },
                  { id: 'green', label: '绿色渐变', class: 'bg-green-600' },
                  { id: 'dark', label: '深色渐变', class: 'bg-gray-800' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setHeroForm({ ...heroForm, heroOverlay: opt.id })}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all ${
                      heroForm.heroOverlay === opt.id ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${opt.class}`} />
                    <span className="text-xs font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <button onClick={saveHero} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center gap-2">
              保存修改
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: 顶部公告栏 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-800">顶部公告栏</h3>
          </div>
          <SaveBadge show={savedSection === 'ann'} />
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-bold text-gray-800 text-sm">启用公告栏</p>
              <p className="text-xs text-gray-500">开启后会在导航栏上方显示一条滚动或静止的通告</p>
            </div>
            <Toggle enabled={annForm.enabled} onToggle={() => setAnnForm({ ...annForm, enabled: !annForm.enabled })} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">公告内容</label>
              <input
                type="text"
                value={annForm.text}
                onChange={(e) => setAnnForm({ ...annForm, text: e.target.value })}
                placeholder="例: 🔥 限时特惠：所有出口车辆享 5% 运费补贴！"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">跳转链接 (可选)</label>
              <input
                type="text"
                value={annForm.link}
                onChange={(e) => setAnnForm({ ...annForm, link: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex-grow">
              <label className="block text-sm font-bold text-gray-700 mb-2">背景颜色</label>
              <div className="flex items-center gap-3">
                {['#ff6b35', '#e53e3e', '#1a73e8', '#38a169', '#805ad5', '#2d3748'].map(color => (
                  <ColorCircle key={color} color={color} selected={annForm.bgColor} onClick={(c) => setAnnForm({ ...annForm, bgColor: c })} />
                ))}
                <div className="h-8 w-[1px] bg-gray-200 mx-1" />
                <input
                  type="text"
                  value={annForm.bgColor}
                  onChange={(e) => setAnnForm({ ...annForm, bgColor: e.target.value })}
                  className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg text-xs font-mono uppercase"
                />
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-xs font-bold text-gray-400 mb-2">效果预览</p>
              <div className="h-8 rounded-lg flex items-center px-4 overflow-hidden shadow-inner text-[10px] text-white font-medium" style={{ backgroundColor: annForm.bgColor }}>
                {annForm.text || '在此输入预览文字...'}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button onClick={saveAnnouncement} className="px-6 py-2 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition-colors flex items-center gap-2">
              保存公告设置
            </button>
          </div>
        </div>
      </div>

      {/* Section 4: 广告轮播位 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-green-600" />
            <h3 className="font-bold text-gray-800">广告轮播位</h3>
          </div>
          <SaveBadge show={savedSection === 'banners'} />
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {homepage.banners.map((banner) => (
              <div key={banner.id} className={`group relative rounded-xl border border-gray-100 overflow-hidden shadow-sm transition-all hover:shadow-md ${!banner.enabled && 'opacity-60 bg-gray-50'}`}>
                <div className="aspect-[16/9] bg-gray-100">
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-800 text-sm truncate pr-2">{banner.title}</h4>
                    <Toggle enabled={banner.enabled} onToggle={() => toggleBanner(banner.id)} />
                  </div>
                  <p className="text-[10px] text-gray-400 truncate">{banner.link || '无链接'}</p>
                </div>
                <button
                  onClick={() => removeBanner(banner.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            {/* Add New Form */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50 flex flex-col justify-between">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Banner 标题"
                  value={newBanner.title}
                  onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                />
                <input
                  type="text"
                  placeholder="图片链接"
                  value={newBanner.image}
                  onChange={(e) => setNewBanner({ ...newBanner, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                />
                <div className="flex gap-2">
                  <input
                    type="file"
                    className="hidden"
                    id="banner-up"
                    onChange={(e) => handleFileUpload(e.target.files[0], (data) => setNewBanner({ ...newBanner, image: data }))}
                  />
                  <label htmlFor="banner-up" className="flex-grow flex items-center justify-center gap-1.5 py-1.5 border border-gray-200 rounded-lg bg-white text-xs font-bold text-gray-500 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" /> 上传图片
                  </label>
                </div>
              </div>
              <button onClick={addBanner} className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-1.5">
                <Plus className="w-4 h-4" /> 添加广告位
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: 数据统计编辑 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-gray-800">数据统计编辑</h3>
          </div>
          <SaveBadge show={savedSection === 'stats'} />
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">出口车辆数 (vehicles)</label>
              <input
                type="text"
                value={statsForm.vehicles}
                onChange={(e) => setStatsForm({ ...statsForm, vehicles: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-100 font-bold text-gray-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">覆盖国家 (countries)</label>
              <input
                type="text"
                value={statsForm.countries}
                onChange={(e) => setStatsForm({ ...statsForm, countries: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-100 font-bold text-gray-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">合作伙伴 (partners)</label>
              <input
                type="text"
                value={statsForm.partners}
                onChange={(e) => setStatsForm({ ...statsForm, partners: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-100 font-bold text-gray-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">行业经验 (experience)</label>
              <input
                type="text"
                value={statsForm.experience}
                onChange={(e) => setStatsForm({ ...statsForm, experience: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-100 font-bold text-gray-700"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button onClick={saveStats} className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              更新统计数据
            </button>
          </div>
        </div>
      </div>

      {/* Section 6: 主题色 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-gray-800">全局主题配置</h3>
          </div>
          <SaveBadge show={savedSection === 'theme'} />
        </div>
        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primary Color */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600" /> 主题色 (Primary)
              </label>
              <div className="flex items-center gap-3 mb-4">
                {['#1a73e8', '#2563eb', '#0891b2', '#059669', '#7c3aed'].map(c => (
                  <ColorCircle key={c} color={c} selected={themeForm.primaryColor} onClick={(color) => setThemeForm({ ...themeForm, primaryColor: color })} />
                ))}
                <div className="h-8 w-[1px] bg-gray-200 mx-1" />
                <input
                  type="text"
                  value={themeForm.primaryColor}
                  onChange={(e) => setThemeForm({ ...themeForm, primaryColor: e.target.value })}
                  className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg text-xs font-mono uppercase"
                />
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase">按钮预览</p>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 text-xs text-white rounded-lg font-bold shadow-sm" style={{ backgroundColor: themeForm.primaryColor }}>主要操作</button>
                  <button className="px-4 py-1.5 text-xs rounded-lg font-bold border" style={{ borderColor: themeForm.primaryColor, color: themeForm.primaryColor }}>描边按钮</button>
                </div>
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" /> 辅助色 (Secondary/CTA)
              </label>
              <div className="flex items-center gap-3 mb-4">
                {['#ff6b35', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'].map(c => (
                  <ColorCircle key={c} color={c} selected={themeForm.secondaryColor} onClick={(color) => setThemeForm({ ...themeForm, secondaryColor: color })} />
                ))}
                <div className="h-8 w-[1px] bg-gray-200 mx-1" />
                <input
                  type="text"
                  value={themeForm.secondaryColor}
                  onChange={(e) => setThemeForm({ ...themeForm, secondaryColor: e.target.value })}
                  className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg text-xs font-mono uppercase"
                />
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase">强调预览</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: themeForm.secondaryColor }}>
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold" style={{ color: themeForm.secondaryColor }}>行动呼吁文字链接</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-50 pt-6">
            <button onClick={saveTheme} className="px-10 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-xl">
              保存并应用全局主题
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Link Preview */}
      <div className="bg-blue-600 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg">
            <ExternalLink className="w-8 h-8 text-white" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-extrabold text-2xl">查看前台效果</h4>
            <p className="text-white/80 text-sm mt-1">装修后的效果已即时同步，快去看看吧！</p>
          </div>
        </div>
        
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 md:mt-0 px-10 py-4 bg-white text-blue-600 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 relative z-10 flex items-center gap-2"
        >
          打开首页预览 <ChevronRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default HomepageManage;
