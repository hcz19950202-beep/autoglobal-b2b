import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getVehicle, createVehicle, updateVehicle, getBrands, uploadImage, uploadMultipleImages } from '../../services/api';
import {
  Save, X, Upload, Image as ImageIcon, ChevronLeft, Loader2, AlertCircle, Plus, Trash2
} from 'lucide-react';

const VehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [brands] = useState(['丰田', '本田', '日产', '三菱', '马自达', '斯巴鲁', '铃木', '五十铃', '宝马', '奔驰', '奥迪', '雷克萨斯', '特斯拉', '现代', '起亚', '福特', '大众']);

  const initialFormState = {
    title: '', brand: '', model: '', year: new Date().getFullYear(), price: '', mileage: '',
    bodyType: '', fuelType: '', transmission: '', driveType: '', engineCapacity: '',
    exteriorColor: '', interiorColor: '', vin: '', condition: 'used', location: '日本',
    port: '', description: '', features: [], isFeatured: false, status: 'available',
    mainImage: '', images: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      if (isEditMode) {
        try {
          const vehicle = await getVehicle(id);
          setFormData({ ...initialFormState, ...vehicle, features: vehicle.features || [] });
        } catch (err) {
          setError('无法加载车辆数据');
        }
      }
      setIsLoading(false);
    };
    fetchInitialData();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const result = await uploadImage(file);
      setFormData(prev => ({ ...prev, mainImage: result.url }));
    } catch (err) {
      alert('图片上传失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setIsUploading(true);
    try {
      const result = await uploadMultipleImages(files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...result.images.map(img => img.url)] }));
    } catch (err) {
      alert('图片上传失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      if (isEditMode) { await updateVehicle(id, formData); }
      else { await createVehicle(formData); }
      navigate('/admin/vehicles');
    } catch (err) {
      setError(err.response?.data?.message || '保存失败，请重试');
      if (!isEditMode) navigate('/admin/vehicles');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-[#1a73e8] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">加载车辆信息...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto font-sans pb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/admin/vehicles" className="p-2 mr-4 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-[#1a73e8] hover:border-[#1a73e8] transition-all">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditMode ? '编辑车辆' : '添加新车辆'}
          </h1>
        </div>
        <div className="flex space-x-3">
          <Link to="/admin/vehicles" className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-bold transition-all">
            取消
          </Link>
          <button onClick={handleSubmit} disabled={isSaving} className="px-6 py-2 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0] shadow-lg shadow-blue-200 font-bold transition-all flex items-center disabled:opacity-50">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {isSaving ? '保存中...' : '保存车辆'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 基本信息 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-800">基本信息</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="md:col-span-2 lg:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">车辆标题 *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="例：2022 丰田凯美瑞混动 尊贵版" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">品牌 *</label>
              <select name="brand" required value={formData.brand} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all">
                <option value="">选择品牌</option>
                {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">型号 *</label>
              <input type="text" name="model" required value={formData.model} onChange={handleChange} placeholder="例：凯美瑞" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">年份 *</label>
              <input type="number" name="year" required value={formData.year} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">价格 (USD) *</label>
              <input type="number" name="price" required value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all" />
            </div>
          </div>
        </div>

        {/* 车辆规格 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-800">车辆规格</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">里程 (km)</label>
              <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">车身类型</label>
              <select name="bodyType" value={formData.bodyType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all">
                <option value="">选择车身</option>
                <option value="Sedan">轿车</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">掀背车</option>
                <option value="Coupe">轿跑</option>
                <option value="Van">面包车/MPV</option>
                <option value="Truck">皮卡/卡车</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">燃料类型</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all">
                <option value="">选择燃料</option>
                <option value="Petrol">汽油</option>
                <option value="Diesel">柴油</option>
                <option value="Hybrid">混动</option>
                <option value="Electric">纯电</option>
                <option value="LPG">LPG</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">变速箱</label>
              <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all">
                <option value="">选择</option>
                <option value="Automatic">自动挡</option>
                <option value="Manual">手动挡</option>
                <option value="CVT">CVT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">驱动方式</label>
              <select name="driveType" value={formData.driveType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all">
                <option value="">选择</option>
                <option value="2WD">两驱</option>
                <option value="4WD">四驱</option>
                <option value="AWD">全时四驱</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">排量 (cc)</label>
              <input type="text" name="engineCapacity" value={formData.engineCapacity} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">外观颜色</label>
              <input type="text" name="exteriorColor" value={formData.exteriorColor} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">VIN 码</label>
              <input type="text" name="vin" value={formData.vin} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all" />
            </div>
          </div>
        </div>

        {/* 物流 & 状态 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-800">物流与状态</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">所在地</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">出口港口</label>
              <input type="text" name="port" value={formData.port} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">销售状态</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all font-bold text-blue-600">
                <option value="available">在售</option>
                <option value="reserved">已预留</option>
                <option value="sold">已售出</option>
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <label className="relative flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-all border border-gray-100">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[10px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ff6b35]"></div>
                <span className="ml-3 text-sm font-bold text-gray-700">设为精选</span>
              </label>
            </div>
          </div>
        </div>

        {/* 图片上传 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">车辆图片</h3>
            <span className="text-xs text-gray-500 font-medium">最多10张，支持 JPG/PNG</span>
          </div>
          <div className="p-6 relative">
            {isUploading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-xl">
                <div className="flex flex-col items-center">
                  <Loader2 className="h-8 w-8 text-[#1a73e8] animate-spin mb-2" />
                  <span className="text-sm font-bold text-gray-500">上传中...</span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div className="col-span-2 row-span-2 relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden group">
                {formData.mainImage ? (
                  <>
                    <img src={formData.mainImage} alt="封面" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => setFormData({...formData, mainImage: ''})} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all">
                    <Upload className="h-10 w-10 text-gray-300 mb-2" />
                    <span className="text-sm font-bold text-gray-400">上传封面图</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleCoverUpload} />
                  </label>
                )}
                {formData.mainImage && <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">封面</div>}
              </div>
              <label className="relative aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-blue-400 transition-all text-gray-300 hover:text-blue-500">
                <Plus className="h-8 w-8" />
                <span className="text-[10px] font-bold mt-1">添加图片</span>
                <input type="file" className="hidden" multiple accept="image/*" onChange={handleGalleryUpload} />
              </label>
            </div>
            <div className="mt-6 flex items-center p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-700">
              <ImageIcon className="h-5 w-5 mr-3 shrink-0" />
              <p className="text-xs">提示：演示版本中图片上传为模拟功能，正式部署后可对接云存储。</p>
            </div>
          </div>
        </div>

        {/* 描述 & 配置 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-800">车辆描述</h3>
            </div>
            <div className="p-6">
              <textarea name="description" rows="8" value={formData.description} onChange={handleChange} placeholder="描述车辆状况、历史记录和主要卖点..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all resize-none text-sm"></textarea>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-800">主要配置</h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleAddFeature} className="flex gap-2 mb-4">
                <input type="text" placeholder="例：真皮座椅" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className="flex-grow px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all text-sm" />
                <button type="button" onClick={handleAddFeature} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors">
                  <Plus className="h-5 w-5" />
                </button>
              </form>
              <div className="flex flex-wrap gap-2">
                {formData.features.length > 0 ? formData.features.map((feature, idx) => (
                  <span key={idx} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold border border-gray-200">
                    {feature}
                    <button type="button" onClick={() => removeFeature(idx)} className="ml-2 text-gray-400 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )) : (
                  <p className="text-sm text-gray-400 italic">暂未添加配置</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
