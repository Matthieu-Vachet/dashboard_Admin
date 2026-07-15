# Interaction and state model

## Standard state vocabulary

Default, Hover, Pressed, Focused, Selected, Checked, Unchecked, Loading, Disabled, Error, Warning, Success, Empty, Collapsed, Expanded, Dragging, Drop Target, Active, Inactive, Read Only, Hidden, Visible, Scrollable and Sticky.

## Detected component-state coverage

| Component | Detected states | Events |
|---|---|---|
| MWI-COMP-001 | Default, Hover, Error, Warning, Success, Active, Inactive, Visible | Not found |
| MWI-COMP-002 | Default, Visible | Not found |
| MWI-COMP-003 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-004 | Default, Hover, Error, Visible | Not found |
| MWI-COMP-005 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-006 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-007 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-008 | Default, Hover, Error, Warning, Success, Read Only, Visible | Not found |
| MWI-COMP-009 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-010 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-011 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-012 | Default, Hover, Focused, Warning, Success, Visible | Not found |
| MWI-COMP-013 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-014 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-015 | Default, Hover, Selected, Loading, Disabled, Error, Warning, Success, Expanded, Visible | onChange, onClick, onClose |
| MWI-COMP-016 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-017 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-018 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-019 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-020 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-021 | Default, Warning, Read Only, Visible | Not found |
| MWI-COMP-022 | Default, Hover, Error, Warning, Success, Visible | Not found |
| MWI-COMP-023 | Default, Loading, Error, Warning, Success, Active, Inactive, Visible | Not found |
| MWI-COMP-024 | Default, Visible | Not found |
| MWI-COMP-025 | Default, Error, Visible | Not found |
| MWI-COMP-026 | Default, Hover, Error, Warning, Success, Visible | onChange, onClick, onCopy |
| MWI-COMP-027 | Default, Visible | onClick |
| MWI-COMP-028 | Default, Hover, Error, Warning, Success, Expanded, Visible | onChange, onClick |
| MWI-COMP-029 | Default, Visible | Not found |
| MWI-COMP-030 | Default, Hover, Error, Warning, Success, Empty, Active, Inactive, Visible | Not found |
| MWI-COMP-031 | Default, Hover, Success, Visible, Scrollable | onClick |
| MWI-COMP-032 | Default, Visible | Not found |
| MWI-COMP-033 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-034 | Default, Visible | Not found |
| MWI-COMP-035 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-036 | Default, Visible | Not found |
| MWI-COMP-037 | Default, Empty, Visible | Not found |
| MWI-COMP-038 | Default, Hover, Visible | Not found |
| MWI-COMP-039 | Default, Hover, Visible | Not found |
| MWI-COMP-040 | Default, Empty, Visible | Not found |
| MWI-COMP-041 | Default, Hover, Disabled, Error, Warning, Success, Visible | onClick |
| MWI-COMP-042 | Default, Visible | Not found |
| MWI-COMP-043 | Default, Hover, Focused, Error, Warning, Success, Empty, Visible, Scrollable | onChange, onClick, onClose, onSave |
| MWI-COMP-044 | Default, Hover, Error, Empty, Expanded, Visible | onChange, onClick, onClose |
| MWI-COMP-045 | Default, Hover, Focused, Disabled, Visible, Scrollable | onChange, onClick |
| MWI-COMP-046 | Default, Hover, Focused, Disabled, Visible | onChange, onClick |
| MWI-COMP-047 | Default, Focused, Visible | onChange |
| MWI-COMP-048 | Default, Focused, Visible | onChange |
| MWI-COMP-049 | Default, Focused, Visible | onChange |
| MWI-COMP-050 | Default, Loading, Visible | onError |
| MWI-COMP-051 | Default, Hover, Focused, Selected, Loading, Disabled, Error, Warning, Success, Empty, Visible | onArchive, onChange, onClick, onClose, onCreate, onDelete, onDuplicate, onEdit, onImport, onOpen, onOpenDay, onOpenPokemon, onRestore, onSave |
| MWI-COMP-052 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-053 | Default, Visible | onCreate, onOpen, onOpenDay |
| MWI-COMP-054 | Default, Hover, Hidden, Visible | onClick, onOpen |
| MWI-COMP-055 | Default, Hover, Visible | onClick |
| MWI-COMP-056 | Default, Hover, Loading, Visible | onClick |
| MWI-COMP-057 | Default, Empty, Visible | onOpen |
| MWI-COMP-058 | Default, Empty, Expanded, Visible | onClick, onOpen |
| MWI-COMP-059 | Default, Hover, Loading, Success, Visible | onClick |
| MWI-COMP-060 | Default, Hover, Loading, Visible | onClick |
| MWI-COMP-061 | Default, Loading, Empty, Visible | Not found |
| MWI-COMP-062 | Default, Visible | Not found |
| MWI-COMP-063 | Default, Visible | Not found |
| MWI-COMP-064 | Default, Hover, Disabled, Success, Empty, Visible, Scrollable | onClick, onOpenPokemon |
| MWI-COMP-065 | Default, Visible | Not found |
| MWI-COMP-066 | Default, Empty, Visible | onOpenPokemon |
| MWI-COMP-067 | Default, Hover, Loading, Warning, Visible | onClick |
| MWI-COMP-068 | Default, Empty, Expanded, Visible | onOpenPokemon |
| MWI-COMP-069 | Default, Expanded, Visible | onOpenPokemon |
| MWI-COMP-070 | Default, Loading, Empty, Visible | Not found |
| MWI-COMP-071 | Default, Visible | Not found |
| MWI-COMP-072 | Default, Empty, Visible | Not found |
| MWI-COMP-073 | Default, Hover, Selected, Loading, Error, Warning, Success, Empty, Expanded, Active, Inactive, Visible | onChange, onClick, onClose, onOpen, onSelect |
| MWI-COMP-074 | Default, Selected, Error, Warning, Visible | onClick |
| MWI-COMP-075 | Default, Hover, Visible | onClick |
| MWI-COMP-076 | Default, Hover, Empty, Visible | onClick |
| MWI-COMP-077 | Default, Error, Warning, Success, Empty, Visible | onOpen |
| MWI-COMP-078 | Default, Hover, Selected, Error, Warning, Success, Visible | onClick |
| MWI-COMP-079 | Default, Hover, Focused, Error, Warning, Success, Visible | onChange, onClick |
| MWI-COMP-080 | Default, Success, Visible | Not found |
| MWI-COMP-081 | Default, Hover, Selected, Error, Warning, Success, Empty, Expanded, Visible | onChanged, onClick, onClose, onNotify, onOpen, onSetProgress |
| MWI-COMP-082 | Default, Hover, Selected, Checked, Unchecked, Loading, Error, Warning, Success, Expanded, Dragging, Drop Target, Active, Inactive, Visible | onChange, onClick, onClose, onDelete, onDragCancel, onDragEnd, onDragStart, onSelect |
| MWI-COMP-083 | Default, Selected, Error, Warning, Success, Empty, Drop Target, Visible | onDelete, onSelect |
| MWI-COMP-084 | Default, Hover, Selected, Error, Warning, Success, Empty, Dragging, Visible | onClick |
| MWI-COMP-085 | Default, Error, Warning, Success, Visible | Not found |
| MWI-COMP-086 | Default, Hover, Focused, Selected, Loading, Error, Warning, Success, Empty, Active, Inactive, Visible, Scrollable | onChange, onClick |
| MWI-COMP-087 | Default, Hover, Loading, Error, Warning, Success, Expanded, Active, Inactive, Visible | onChange, onClick, onKeyDown |
| MWI-COMP-088 | Default, Hover, Selected, Error, Warning, Success, Active, Inactive, Visible | onChange, onClick |
| MWI-COMP-089 | Default, Hover, Error, Visible | onClick |
| MWI-COMP-090 | Default, Visible, Scrollable | Not found |
| MWI-COMP-091 | Default, Visible | Not found |
| MWI-COMP-092 | Default, Hover, Focused, Error, Warning, Success, Collapsed, Expanded, Hidden, Visible | onClick, onClose, onCloseMobile, onOpenSidebar, onOpenVersionHistory, onToggleCollapsed, onToggleNavGroup, onVersionClick |
| MWI-COMP-093 | Default, Visible | Not found |
| MWI-COMP-094 | Default, Hover, Expanded, Visible, Scrollable | onClick |
| MWI-COMP-095 | Default, Error, Warning, Success, Visible | Not found |
| MWI-COMP-096 | Default, Empty, Visible, Scrollable | Not found |
| MWI-COMP-097 | Default, Empty, Visible | Not found |
| MWI-COMP-098 | Default, Hover, Error, Warning, Success, Empty, Expanded, Visible | onClose, onNotify, onSetProgress |
| MWI-COMP-099 | Default, Hover, Error, Warning, Success, Visible | onSetProgress |
| MWI-COMP-100 | Default, Hover, Error, Warning, Success, Empty, Visible | onSetProgress |
| MWI-COMP-101 | Default, Hover, Disabled, Error, Warning, Success, Empty, Expanded, Visible | onChange, onClick, onSetProgress |
| MWI-COMP-102 | Default, Hover, Error, Warning, Success, Visible | onSetProgress |
| MWI-COMP-103 | Default, Hover, Error, Warning, Success, Visible | onSetProgress |
| MWI-COMP-104 | Default, Error, Warning, Success, Visible | Not found |
| MWI-COMP-105 | Default, Hover, Disabled, Error, Visible | onClick |
| MWI-COMP-106 | Default, Warning, Success, Visible, Scrollable | Not found |
| MWI-COMP-107 | Default, Visible | Not found |
| MWI-COMP-108 | Default, Visible | Not found |
| MWI-COMP-109 | Default, Visible | Not found |
| MWI-COMP-110 | Default, Visible | Not found |
| MWI-COMP-111 | Default, Error, Warning, Success, Empty, Visible | Not found |
| MWI-COMP-112 | Default, Error, Success, Empty, Hidden, Visible | Not found |
| MWI-COMP-113 | Default, Visible | Not found |
| MWI-COMP-114 | Default, Visible | Not found |
| MWI-COMP-115 | Default, Hover, Selected, Loading, Disabled, Error, Warning, Success, Empty, Collapsed, Expanded, Visible, Scrollable | onChange, onClick, onClose, onDragOver, onDrop |
| MWI-COMP-116 | Default, Checked, Unchecked, Visible | onChange |
| MWI-COMP-117 | Default, Visible | Not found |
| MWI-COMP-118 | Default, Error, Warning, Visible | Not found |
| MWI-COMP-119 | Default, Hover, Focused, Error, Warning, Success, Visible | onClick |
| MWI-COMP-120 | Default, Visible | Not found |
| MWI-COMP-121 | Default, Hover, Error, Collapsed, Expanded, Active, Inactive, Visible | onClick |
| MWI-COMP-122 | Default, Hover, Error, Warning, Success, Collapsed, Expanded, Hidden, Visible, Scrollable | onClick, onNavigate |
| MWI-COMP-123 | Default, Hover, Loading, Warning, Success, Collapsed, Active, Inactive, Hidden, Visible | onClick |
| MWI-COMP-124 | Default, Hover, Error, Collapsed, Hidden, Visible, Sticky | onClick |
| MWI-COMP-125 | Default, Hover, Visible | onClick |
| MWI-COMP-126 | Default, Hover, Focused, Checked, Unchecked, Disabled, Warning, Success, Empty, Active, Inactive, Visible, Scrollable | onChange, onClick, onOpen |
| MWI-COMP-127 | Default, Hover, Focused, Selected, Checked, Unchecked, Loading, Disabled, Error, Warning, Success, Empty, Expanded, Active, Inactive, Read Only, Visible | onAssetAudit, onAssetChecked, onAuditUrls, onChange, onClick, onClose, onCopyPatch, onDelete, onDownload, onEdit, onFormChange, onLoadHistory, onNext, onOpen, onOpenDeployHistory, onOpenEntry, onOpenPokemon, onOpenRelated, onOpenSourceHistory, onOptionsChange, onPasswordChange, onPreview, onPrevious, onRefresh, onRegenerate, onSave, onSelect, onSubmit, onSyncGithub, onToggle |
| MWI-COMP-128 | Default, Loading, Active, Inactive, Hidden, Visible | Not found |
| MWI-COMP-129 | Default, Hover, Focused, Selected, Empty, Expanded, Active, Inactive, Visible | onChange, onClick |
| MWI-COMP-130 | Default, Hover, Focused, Loading, Error, Warning, Success, Empty, Visible | onChange, onClick, onKeyDown |
| MWI-COMP-131 | Default, Visible | Not found |
| MWI-COMP-132 | Default, Empty, Visible | Not found |
| MWI-COMP-133 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-134 | Default, Hover, Loading, Active, Inactive, Hidden, Visible | onClick |
| MWI-COMP-135 | Default, Success, Empty, Visible | Not found |
| MWI-COMP-136 | Default, Visible | Not found |
| MWI-COMP-137 | Default, Hover, Warning, Visible | onClick |
| MWI-COMP-138 | Default, Warning, Active, Inactive, Visible | onOpen |
| MWI-COMP-139 | Default, Warning, Visible | Not found |
| MWI-COMP-140 | Default, Loading, Empty, Visible | Not found |
| MWI-COMP-141 | Default, Loading, Empty, Visible | Not found |
| MWI-COMP-142 | Default, Hover, Loading, Warning, Success, Empty, Visible, Scrollable | onClick |
| MWI-COMP-143 | Default, Loading, Warning, Success, Empty, Expanded, Visible | onClose, onOpen, onPreview |
| MWI-COMP-144 | Default, Hover, Warning, Success, Empty, Visible, Scrollable | onClick |
| MWI-COMP-145 | Default, Visible | Not found |
| MWI-COMP-146 | Default, Success, Empty, Visible | Not found |
| MWI-COMP-147 | Default, Hover, Empty, Expanded, Visible, Scrollable | onClick |
| MWI-COMP-148 | Default, Hover, Focused, Empty, Visible, Scrollable | onChange, onClick, onOpen |
| MWI-COMP-149 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-150 | Default, Hover, Focused, Selected, Checked, Unchecked, Error, Warning, Success, Empty, Active, Inactive, Visible, Scrollable, Sticky | onChange, onClick, onDoubleClick |
| MWI-COMP-151 | Default, Visible | Not found |
| MWI-COMP-152 | Default, Hover, Selected, Error, Warning, Success, Active, Inactive, Hidden, Visible | Not found |
| MWI-COMP-153 | Default, Hover, Loading, Success, Visible | Not found |
| MWI-COMP-154 | Default, Hover, Focused, Active, Inactive, Visible | onChange, onClick |
| MWI-COMP-155 | Default, Visible | Not found |
| MWI-COMP-156 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-157 | Default, Visible | Not found |
| MWI-COMP-158 | Default, Empty, Visible | Not found |
| MWI-COMP-159 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-160 | Default, Warning, Success, Empty, Visible | Not found |
| MWI-COMP-161 | Default, Empty, Visible | Not found |
| MWI-COMP-162 | Default, Visible | Not found |
| MWI-COMP-163 | Default, Visible | Not found |
| MWI-COMP-164 | Default, Visible | Not found |
| MWI-COMP-165 | Default, Visible | Not found |
| MWI-COMP-166 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-167 | Default, Hover, Warning, Success, Empty, Visible | Not found |
| MWI-COMP-168 | Default, Hover, Visible | onClick |
| MWI-COMP-169 | Default, Warning, Success, Empty, Visible | onClick |
| MWI-COMP-170 | Default, Warning, Success, Empty, Visible | onClick |
| MWI-COMP-171 | Default, Visible | onClick |
| MWI-COMP-172 | Default, Hover, Warning, Success, Empty, Visible, Scrollable | onClick |
| MWI-COMP-173 | Default, Warning, Empty, Hidden, Visible | Not found |
| MWI-COMP-174 | Default, Warning, Success, Empty, Visible, Scrollable | Not found |
| MWI-COMP-175 | Default, Warning, Success, Empty, Visible | Not found |
| MWI-COMP-176 | Default, Visible, Scrollable | Not found |
| MWI-COMP-177 | Default, Hover, Checked, Unchecked, Warning, Success, Visible | onChange, onClick |
| MWI-COMP-178 | Default, Hover, Checked, Unchecked, Error, Warning, Success, Empty, Collapsed, Expanded, Visible, Scrollable | onAssetAudit, onAssetChecked, onAuditUrls, onClick, onCopyPatch, onNext, onOpenRelated, onPrevious |
| MWI-COMP-179 | Default, Visible | Not found |
| MWI-COMP-180 | Default, Visible | Not found |
| MWI-COMP-181 | Default, Hover, Loading, Disabled, Warning, Success, Visible | onClick |
| MWI-COMP-182 | Default, Warning, Success, Empty, Visible | onOpenPokemon |
| MWI-COMP-183 | Default, Hover, Focused, Loading, Disabled, Warning, Success, Empty, Active, Inactive, Visible | onClick, onOpenPokemon, onQueryChange |
| MWI-COMP-184 | Default, Visible | Not found |
| MWI-COMP-185 | Default, Hover, Focused, Loading, Disabled, Error, Visible | onChange, onSubmit |
| MWI-COMP-186 | Default, Visible | Not found |
| MWI-COMP-187 | Default, Hover, Loading, Disabled, Warning, Success, Visible | onClick |
| MWI-COMP-188 | Default, Warning, Success, Empty, Visible | onOpenPokemon |
| MWI-COMP-189 | Default, Hover, Focused, Loading, Disabled, Warning, Success, Empty, Active, Inactive, Visible | onClick, onOpenPokemon, onQueryChange |
| MWI-COMP-190 | Default, Hover, Focused, Warning, Success, Visible | Not found |
| MWI-COMP-191 | Default, Hover, Selected, Loading, Disabled, Error, Warning, Success, Empty, Visible, Scrollable | onChange, onClick |
| MWI-COMP-192 | Default, Visible | Not found |
| MWI-COMP-193 | Default, Hover, Error, Warning, Success, Active, Inactive, Visible | Not found |
| MWI-COMP-194 | Default, Visible | Not found |
| MWI-COMP-195 | Default, Visible | Not found |
| MWI-COMP-196 | Default, Visible | Not found |
| MWI-COMP-197 | Default, Visible | Not found |
| MWI-COMP-198 | Default, Hover, Checked, Unchecked, Loading, Warning, Success, Hidden, Visible | onChange, onClick |
| MWI-COMP-199 | Default, Hover, Focused, Selected, Error, Warning, Success, Empty, Visible | onChange, onClick |
| MWI-COMP-200 | Default, Collapsed, Visible, Scrollable | Not found |
| MWI-COMP-201 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-202 | Default, Loading, Warning, Success, Visible | Not found |
| MWI-COMP-203 | Default, Visible | Not found |
| MWI-COMP-204 | Default, Hover, Warning, Empty, Visible | onClick |
| MWI-COMP-205 | Default, Focused, Visible | onChange |
| MWI-COMP-206 | Default, Hover, Focused, Selected, Loading, Disabled, Warning, Empty, Expanded, Visible | onChange, onClick, onOpenPokemon, onQueryChange |
| MWI-COMP-207 | Default, Visible | Not found |
| MWI-COMP-208 | Default, Hover, Loading, Disabled, Warning, Success, Visible | onClick |
| MWI-COMP-209 | Default, Warning, Success, Empty, Visible | onOpenPokemon |
| MWI-COMP-210 | Default, Hover, Focused, Loading, Disabled, Warning, Success, Empty, Active, Inactive, Visible | onClick, onOpenPokemon, onQueryChange |
| MWI-COMP-211 | Default, Loading, Empty, Visible | Not found |
| MWI-COMP-212 | Default, Visible | Not found |
| MWI-COMP-213 | Default, Loading, Warning, Success, Visible | Not found |
| MWI-COMP-214 | Default, Loading, Warning, Success, Visible | Not found |
| MWI-COMP-215 | Default, Visible | Not found |
| MWI-COMP-216 | Default, Success, Expanded, Hidden, Visible | Not found |
| MWI-COMP-217 | Default, Success, Empty, Expanded, Hidden, Visible | onToggle |
| MWI-COMP-218 | Default, Hover, Focused, Loading, Disabled, Warning, Success, Active, Inactive, Visible | onClick, onQueryChange |
| MWI-COMP-219 | Default, Loading, Empty, Visible | Not found |
| MWI-COMP-220 | Default, Loading, Warning, Visible | Not found |
| MWI-COMP-221 | Default, Hover, Loading, Disabled, Success, Visible | onClick |
| MWI-COMP-222 | Default, Empty, Visible | onOpenPokemon |
| MWI-COMP-223 | Default, Loading, Success, Expanded, Hidden, Visible | onOpenPokemon, onToggle |
| MWI-COMP-224 | Default, Hover, Focused, Loading, Disabled, Warning, Success, Empty, Active, Inactive, Visible | onClick, onOpenPokemon, onQueryChange |
| MWI-COMP-225 | Default, Success, Visible | Not found |
| MWI-COMP-226 | Default, Visible | Not found |
| MWI-COMP-227 | Default, Hover, Warning, Success, Empty, Visible | onClick |
| MWI-COMP-228 | Default, Warning, Empty, Visible | onClick |
| MWI-COMP-229 | Default, Hover, Focused, Selected, Loading, Disabled, Warning, Success, Empty, Expanded, Active, Inactive, Visible | onChange, onClick, onClose, onOpen, onOpenPokemon, onQueryChange |
| MWI-COMP-230 | Default, Hover, Checked, Unchecked, Success, Empty, Collapsed, Expanded, Visible, Scrollable | onClick |
| MWI-COMP-231 | Default, Hover, Warning, Success, Empty, Collapsed, Expanded, Visible, Scrollable | onClick |
| MWI-COMP-232 | Default, Hover, Loading, Error, Warning, Success, Visible | Not found |
| MWI-COMP-233 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-234 | Default, Warning, Success, Empty, Expanded, Visible | onClick |
| MWI-COMP-235 | Default, Hover, Checked, Unchecked, Success, Empty, Visible | onClick |
| MWI-COMP-236 | Default, Hover, Hidden, Visible | onClick |
| MWI-COMP-237 | Default, Loading, Visible | Not found |
| MWI-COMP-238 | Default, Hover, Success, Empty, Dragging, Drop Target, Active, Inactive, Visible | onClick, onDragEnd, onHide |
| MWI-COMP-239 | Default, Hover, Warning, Dragging, Hidden, Visible | onClick |
| MWI-COMP-240 | Default, Visible | Not found |
| MWI-COMP-241 | Default, Hover, Loading, Disabled, Error, Warning, Success, Empty, Active, Inactive, Visible | onClick |
| MWI-COMP-242 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-243 | Default, Empty, Visible | Not found |
| MWI-COMP-244 | Default, Visible | Not found |
| MWI-COMP-245 | Default, Visible | Not found |
| MWI-COMP-246 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-247 | Default, Visible | Not found |
| MWI-COMP-248 | Default, Visible | Not found |
| MWI-COMP-249 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-250 | Default, Error, Warning, Success, Visible | Not found |
| MWI-COMP-251 | Default, Warning, Success, Visible | Not found |
| MWI-COMP-252 | Default, Hover, Focused, Loading, Error, Warning, Success, Empty, Expanded, Active, Inactive, Visible | onArchive, onChange, onClick, onClose, onCopy, onDelete, onEdit, onMarkDone, onSave, onUpdate |
| MWI-COMP-253 | Default, Error, Warning, Success, Visible | Not found |
| MWI-COMP-254 | Default, Visible | onChange |
| MWI-COMP-255 | Default, Hover, Error, Warning, Empty, Visible | onClick |
| MWI-COMP-256 | Default, Hover, Disabled, Error, Visible, Scrollable | onChange, onClick |
| MWI-COMP-257 | Default, Visible | onChange |
| MWI-COMP-258 | Default, Visible | onChange |
| MWI-COMP-259 | Default, Visible | onChange |
| MWI-COMP-260 | Default, Visible | Not found |
| MWI-COMP-261 | Default, Visible | Not found |
| MWI-COMP-262 | Default, Visible | Not found |
| MWI-COMP-263 | Default, Visible | Not found |
| MWI-COMP-264 | Default, Visible | Not found |
| MWI-COMP-265 | Default, Visible | Not found |
| MWI-COMP-266 | Default, Visible | Not found |
| MWI-COMP-267 | Default, Visible | Not found |
| MWI-COMP-268 | Default, Visible | Not found |
| MWI-COMP-269 | Default, Visible | Not found |
| MWI-COMP-270 | Default, Visible | Not found |
| MWI-COMP-271 | Default, Visible | Not found |
| MWI-COMP-272 | Default, Visible | Not found |
| MWI-COMP-273 | Default, Visible | Not found |
| MWI-COMP-274 | Default, Visible | Not found |
| MWI-COMP-275 | Default, Loading, Visible | Not found |
| MWI-COMP-276 | Default, Visible | Not found |
| MWI-COMP-277 | Default, Visible | Not found |
| MWI-COMP-278 | Default, Visible | Not found |
| MWI-COMP-279 | Default, Visible | Not found |
| MWI-COMP-280 | Default, Visible | Not found |
| MWI-COMP-281 | Default, Visible | Not found |
| MWI-COMP-282 | Default, Visible | Not found |
| MWI-COMP-283 | Default, Visible | Not found |
| MWI-COMP-284 | Default, Visible | Not found |
| MWI-COMP-285 | Default, Visible | Not found |
| MWI-COMP-286 | Default, Visible | Not found |
| MWI-COMP-287 | Default, Visible | Not found |
| MWI-COMP-288 | Default, Visible | Not found |
| MWI-COMP-289 | Default, Visible | Not found |
| MWI-COMP-290 | Default, Visible | Not found |
| MWI-COMP-291 | Default, Visible | Not found |
| MWI-COMP-292 | Default, Visible | Not found |
| MWI-COMP-293 | Default, Visible | Not found |
| MWI-COMP-294 | Default, Visible | Not found |
| MWI-COMP-295 | Default, Visible | Not found |
| MWI-COMP-296 | Default, Visible | Not found |
| MWI-COMP-297 | Default, Visible | Not found |
| MWI-COMP-298 | Default, Visible | Not found |
| MWI-COMP-299 | Default, Visible | Not found |
| MWI-COMP-300 | Default, Visible | Not found |
| MWI-COMP-301 | Default, Visible | Not found |
| MWI-COMP-302 | Default, Visible | Not found |
| MWI-COMP-303 | Default, Visible | Not found |
| MWI-COMP-304 | Default, Visible | Not found |
| MWI-COMP-305 | Default, Visible | Not found |
| MWI-COMP-306 | Default, Visible | Not found |
| MWI-COMP-307 | Default, Visible | Not found |
| MWI-COMP-308 | Default, Visible | Not found |
| MWI-COMP-309 | Default, Visible | Not found |
| MWI-COMP-310 | Default, Visible | Not found |
| MWI-COMP-311 | Default, Visible | Not found |
| MWI-COMP-312 | Default, Visible | Not found |
| MWI-COMP-313 | Default, Visible | Not found |
| MWI-COMP-314 | Default, Visible | Not found |
| MWI-COMP-315 | Default, Visible | Not found |
| MWI-COMP-316 | Default, Visible | Not found |
| MWI-COMP-317 | Default, Error, Warning, Success, Visible | Not found |
| MWI-COMP-318 | Default, Hover, Focused, Disabled, Error, Visible | Not found |
| MWI-COMP-319 | Default, Visible | Not found |
| MWI-COMP-320 | Default, Visible | Not found |
| MWI-COMP-321 | Default, Visible | Not found |
| MWI-COMP-322 | Default, Visible | Not found |
| MWI-COMP-323 | Default, Focused, Visible | Not found |
| MWI-COMP-324 | Default, Focused, Visible | Not found |
| MWI-COMP-325 | Default, Hover, Collapsed, Expanded, Visible, Scrollable | onClick |

Detection is static. Runtime-only state reachability: Estimated from implementation.
